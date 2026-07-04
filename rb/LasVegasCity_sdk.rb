# LasVegasCity SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'LasVegasCity_types'


class LasVegasCitySDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = LasVegasCityUtility.new
    @_utility = utility

    config = LasVegasCityConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = LasVegasCityHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = LasVegasCityHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, LasVegasCityFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    LasVegasCityUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = LasVegasCityHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = LasVegasCityHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = LasVegasCityHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = LasVegasCitySpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue LasVegasCityError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = LasVegasCityHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = LasVegasCityHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.city_info.list / client.city_info.load({ "id" => ... })
  def city_info
    require_relative 'entity/city_info_entity'
    @city_info ||= CityInfoEntity.new(self, nil)
  end

  # Deprecated: use client.city_info instead.
  def CityInfo(data = nil)
    require_relative 'entity/city_info_entity'
    CityInfoEntity.new(self, data)
  end


  # Idiomatic facade: client.council.list / client.council.load({ "id" => ... })
  def council
    require_relative 'entity/council_entity'
    @council ||= CouncilEntity.new(self, nil)
  end

  # Deprecated: use client.council instead.
  def Council(data = nil)
    require_relative 'entity/council_entity'
    CouncilEntity.new(self, data)
  end


  # Idiomatic facade: client.department.list / client.department.load({ "id" => ... })
  def department
    require_relative 'entity/department_entity'
    @department ||= DepartmentEntity.new(self, nil)
  end

  # Deprecated: use client.department instead.
  def Department(data = nil)
    require_relative 'entity/department_entity'
    DepartmentEntity.new(self, data)
  end


  # Idiomatic facade: client.economic_development.list / client.economic_development.load({ "id" => ... })
  def economic_development
    require_relative 'entity/economic_development_entity'
    @economic_development ||= EconomicDevelopmentEntity.new(self, nil)
  end

  # Deprecated: use client.economic_development instead.
  def EconomicDevelopment(data = nil)
    require_relative 'entity/economic_development_entity'
    EconomicDevelopmentEntity.new(self, data)
  end


  # Idiomatic facade: client.event.list / client.event.load({ "id" => ... })
  def event
    require_relative 'entity/event_entity'
    @event ||= EventEntity.new(self, nil)
  end

  # Deprecated: use client.event instead.
  def Event(data = nil)
    require_relative 'entity/event_entity'
    EventEntity.new(self, data)
  end


  # Idiomatic facade: client.job.list / client.job.load({ "id" => ... })
  def job
    require_relative 'entity/job_entity'
    @job ||= JobEntity.new(self, nil)
  end

  # Deprecated: use client.job instead.
  def Job(data = nil)
    require_relative 'entity/job_entity'
    JobEntity.new(self, data)
  end


  # Idiomatic facade: client.meeting.list / client.meeting.load({ "id" => ... })
  def meeting
    require_relative 'entity/meeting_entity'
    @meeting ||= MeetingEntity.new(self, nil)
  end

  # Deprecated: use client.meeting instead.
  def Meeting(data = nil)
    require_relative 'entity/meeting_entity'
    MeetingEntity.new(self, data)
  end


  # Idiomatic facade: client.new.list / client.new.load({ "id" => ... })
  def new
    require_relative 'entity/new_entity'
    @new ||= NewEntity.new(self, nil)
  end

  # Deprecated: use client.new instead.
  def New(data = nil)
    require_relative 'entity/new_entity'
    NewEntity.new(self, data)
  end


  # Idiomatic facade: client.park.list / client.park.load({ "id" => ... })
  def park
    require_relative 'entity/park_entity'
    @park ||= ParkEntity.new(self, nil)
  end

  # Deprecated: use client.park instead.
  def Park(data = nil)
    require_relative 'entity/park_entity'
    ParkEntity.new(self, data)
  end


  # Idiomatic facade: client.permit.list / client.permit.load({ "id" => ... })
  def permit
    require_relative 'entity/permit_entity'
    @permit ||= PermitEntity.new(self, nil)
  end

  # Deprecated: use client.permit instead.
  def Permit(data = nil)
    require_relative 'entity/permit_entity'
    PermitEntity.new(self, data)
  end


  # Idiomatic facade: client.public_safety.list / client.public_safety.load({ "id" => ... })
  def public_safety
    require_relative 'entity/public_safety_entity'
    @public_safety ||= PublicSafetyEntity.new(self, nil)
  end

  # Deprecated: use client.public_safety instead.
  def PublicSafety(data = nil)
    require_relative 'entity/public_safety_entity'
    PublicSafetyEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = LasVegasCitySDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end

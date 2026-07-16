-- LasVegasCity SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local LasVegasCitySDK = {}
LasVegasCitySDK.__index = LasVegasCitySDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

LasVegasCitySDK._make_feature = _make_feature


function LasVegasCitySDK.new(options)
  local self = setmetatable({}, LasVegasCitySDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function LasVegasCitySDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function LasVegasCitySDK:get_utility()
  return Utility.copy(self._utility)
end


function LasVegasCitySDK:get_root_ctx()
  return self._rootctx
end


function LasVegasCitySDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function LasVegasCitySDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:CityInfo():list() / client:CityInfo():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:CityInfo(data)
  local EntityMod = require("entity.city_info_entity")
  if data == nil then
    if self._city_info == nil then
      self._city_info = EntityMod.new(self, nil)
    end
    return self._city_info
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Council():list() / client:Council():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:Council(data)
  local EntityMod = require("entity.council_entity")
  if data == nil then
    if self._council == nil then
      self._council = EntityMod.new(self, nil)
    end
    return self._council
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Department():list() / client:Department():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:Department(data)
  local EntityMod = require("entity.department_entity")
  if data == nil then
    if self._department == nil then
      self._department = EntityMod.new(self, nil)
    end
    return self._department
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EconomicDevelopment():list() / client:EconomicDevelopment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:EconomicDevelopment(data)
  local EntityMod = require("entity.economic_development_entity")
  if data == nil then
    if self._economic_development == nil then
      self._economic_development = EntityMod.new(self, nil)
    end
    return self._economic_development
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Event():list() / client:Event():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:Event(data)
  local EntityMod = require("entity.event_entity")
  if data == nil then
    if self._event == nil then
      self._event = EntityMod.new(self, nil)
    end
    return self._event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Job():list() / client:Job():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:Job(data)
  local EntityMod = require("entity.job_entity")
  if data == nil then
    if self._job == nil then
      self._job = EntityMod.new(self, nil)
    end
    return self._job
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Meeting():list() / client:Meeting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:Meeting(data)
  local EntityMod = require("entity.meeting_entity")
  if data == nil then
    if self._meeting == nil then
      self._meeting = EntityMod.new(self, nil)
    end
    return self._meeting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:New():list() / client:New():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:New(data)
  local EntityMod = require("entity.new_entity")
  if data == nil then
    if self._new == nil then
      self._new = EntityMod.new(self, nil)
    end
    return self._new
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Park():list() / client:Park():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:Park(data)
  local EntityMod = require("entity.park_entity")
  if data == nil then
    if self._park == nil then
      self._park = EntityMod.new(self, nil)
    end
    return self._park
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Permit():list() / client:Permit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:Permit(data)
  local EntityMod = require("entity.permit_entity")
  if data == nil then
    if self._permit == nil then
      self._permit = EntityMod.new(self, nil)
    end
    return self._permit
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PublicSafety():list() / client:PublicSafety():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LasVegasCitySDK:PublicSafety(data)
  local EntityMod = require("entity.public_safety_entity")
  if data == nil then
    if self._public_safety == nil then
      self._public_safety = EntityMod.new(self, nil)
    end
    return self._public_safety
  end
  return EntityMod.new(self, data)
end




function LasVegasCitySDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = LasVegasCitySDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return LasVegasCitySDK

# LasVegasCity SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LasVegasCityFeatures
  def self.make_feature(name)
    case name
    when "base"
      LasVegasCityBaseFeature.new
    when "ratelimit"
      LasVegasCityRatelimitFeature.new
    when "retry"
      LasVegasCityRetryFeature.new
    when "test"
      LasVegasCityTestFeature.new
    when "timeout"
      LasVegasCityTimeoutFeature.new
    else
      LasVegasCityBaseFeature.new
    end
  end
end

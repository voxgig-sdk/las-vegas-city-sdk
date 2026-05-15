# LasVegasCity SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LasVegasCityFeatures
  def self.make_feature(name)
    case name
    when "base"
      LasVegasCityBaseFeature.new
    when "test"
      LasVegasCityTestFeature.new
    else
      LasVegasCityBaseFeature.new
    end
  end
end

# LasVegasCity SDK exists test

require "minitest/autorun"
require_relative "../LasVegasCity_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LasVegasCitySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end

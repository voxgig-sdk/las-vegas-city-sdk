# LasVegasCity SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LasVegasCityUtility.registrar = ->(u) {
  u.clean = LasVegasCityUtilities::Clean
  u.done = LasVegasCityUtilities::Done
  u.make_error = LasVegasCityUtilities::MakeError
  u.feature_add = LasVegasCityUtilities::FeatureAdd
  u.feature_hook = LasVegasCityUtilities::FeatureHook
  u.feature_init = LasVegasCityUtilities::FeatureInit
  u.fetcher = LasVegasCityUtilities::Fetcher
  u.make_fetch_def = LasVegasCityUtilities::MakeFetchDef
  u.make_context = LasVegasCityUtilities::MakeContext
  u.make_options = LasVegasCityUtilities::MakeOptions
  u.make_request = LasVegasCityUtilities::MakeRequest
  u.make_response = LasVegasCityUtilities::MakeResponse
  u.make_result = LasVegasCityUtilities::MakeResult
  u.make_point = LasVegasCityUtilities::MakePoint
  u.make_spec = LasVegasCityUtilities::MakeSpec
  u.make_url = LasVegasCityUtilities::MakeUrl
  u.param = LasVegasCityUtilities::Param
  u.prepare_auth = LasVegasCityUtilities::PrepareAuth
  u.prepare_body = LasVegasCityUtilities::PrepareBody
  u.prepare_headers = LasVegasCityUtilities::PrepareHeaders
  u.prepare_method = LasVegasCityUtilities::PrepareMethod
  u.prepare_params = LasVegasCityUtilities::PrepareParams
  u.prepare_path = LasVegasCityUtilities::PreparePath
  u.prepare_query = LasVegasCityUtilities::PrepareQuery
  u.result_basic = LasVegasCityUtilities::ResultBasic
  u.result_body = LasVegasCityUtilities::ResultBody
  u.result_headers = LasVegasCityUtilities::ResultHeaders
  u.transform_request = LasVegasCityUtilities::TransformRequest
  u.transform_response = LasVegasCityUtilities::TransformResponse
}

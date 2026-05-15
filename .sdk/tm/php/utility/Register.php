<?php
declare(strict_types=1);

// LasVegasCity SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

LasVegasCityUtility::setRegistrar(function (LasVegasCityUtility $u): void {
    $u->clean = [LasVegasCityClean::class, 'call'];
    $u->done = [LasVegasCityDone::class, 'call'];
    $u->make_error = [LasVegasCityMakeError::class, 'call'];
    $u->feature_add = [LasVegasCityFeatureAdd::class, 'call'];
    $u->feature_hook = [LasVegasCityFeatureHook::class, 'call'];
    $u->feature_init = [LasVegasCityFeatureInit::class, 'call'];
    $u->fetcher = [LasVegasCityFetcher::class, 'call'];
    $u->make_fetch_def = [LasVegasCityMakeFetchDef::class, 'call'];
    $u->make_context = [LasVegasCityMakeContext::class, 'call'];
    $u->make_options = [LasVegasCityMakeOptions::class, 'call'];
    $u->make_request = [LasVegasCityMakeRequest::class, 'call'];
    $u->make_response = [LasVegasCityMakeResponse::class, 'call'];
    $u->make_result = [LasVegasCityMakeResult::class, 'call'];
    $u->make_point = [LasVegasCityMakePoint::class, 'call'];
    $u->make_spec = [LasVegasCityMakeSpec::class, 'call'];
    $u->make_url = [LasVegasCityMakeUrl::class, 'call'];
    $u->param = [LasVegasCityParam::class, 'call'];
    $u->prepare_auth = [LasVegasCityPrepareAuth::class, 'call'];
    $u->prepare_body = [LasVegasCityPrepareBody::class, 'call'];
    $u->prepare_headers = [LasVegasCityPrepareHeaders::class, 'call'];
    $u->prepare_method = [LasVegasCityPrepareMethod::class, 'call'];
    $u->prepare_params = [LasVegasCityPrepareParams::class, 'call'];
    $u->prepare_path = [LasVegasCityPreparePath::class, 'call'];
    $u->prepare_query = [LasVegasCityPrepareQuery::class, 'call'];
    $u->result_basic = [LasVegasCityResultBasic::class, 'call'];
    $u->result_body = [LasVegasCityResultBody::class, 'call'];
    $u->result_headers = [LasVegasCityResultHeaders::class, 'call'];
    $u->transform_request = [LasVegasCityTransformRequest::class, 'call'];
    $u->transform_response = [LasVegasCityTransformResponse::class, 'call'];
});

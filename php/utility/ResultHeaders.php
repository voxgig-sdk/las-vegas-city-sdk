<?php
declare(strict_types=1);

// LasVegasCity SDK utility: result_headers

class LasVegasCityResultHeaders
{
    public static function call(LasVegasCityContext $ctx): ?LasVegasCityResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

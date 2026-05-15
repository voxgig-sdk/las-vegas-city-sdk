<?php
declare(strict_types=1);

// LasVegasCity SDK utility: result_body

class LasVegasCityResultBody
{
    public static function call(LasVegasCityContext $ctx): ?LasVegasCityResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

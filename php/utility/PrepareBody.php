<?php
declare(strict_types=1);

// LasVegasCity SDK utility: prepare_body

class LasVegasCityPrepareBody
{
    public static function call(LasVegasCityContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

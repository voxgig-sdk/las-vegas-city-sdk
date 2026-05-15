<?php
declare(strict_types=1);

// LasVegasCity SDK utility: prepare_headers

class LasVegasCityPrepareHeaders
{
    public static function call(LasVegasCityContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}

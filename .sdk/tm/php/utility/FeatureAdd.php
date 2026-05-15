<?php
declare(strict_types=1);

// LasVegasCity SDK utility: feature_add

class LasVegasCityFeatureAdd
{
    public static function call(LasVegasCityContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}

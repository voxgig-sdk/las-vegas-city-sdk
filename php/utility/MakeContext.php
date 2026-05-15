<?php
declare(strict_types=1);

// LasVegasCity SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LasVegasCityMakeContext
{
    public static function call(array $ctxmap, ?LasVegasCityContext $basectx): LasVegasCityContext
    {
        return new LasVegasCityContext($ctxmap, $basectx);
    }
}

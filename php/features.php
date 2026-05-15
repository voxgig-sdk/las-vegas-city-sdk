<?php
declare(strict_types=1);

// LasVegasCity SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LasVegasCityFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LasVegasCityBaseFeature();
            case "test":
                return new LasVegasCityTestFeature();
            default:
                return new LasVegasCityBaseFeature();
        }
    }
}

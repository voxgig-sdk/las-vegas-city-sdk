<?php
declare(strict_types=1);

// LasVegasCity SDK base feature

class LasVegasCityBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LasVegasCityContext $ctx, array $options): void {}
    public function PostConstruct(LasVegasCityContext $ctx): void {}
    public function PostConstructEntity(LasVegasCityContext $ctx): void {}
    public function SetData(LasVegasCityContext $ctx): void {}
    public function GetData(LasVegasCityContext $ctx): void {}
    public function GetMatch(LasVegasCityContext $ctx): void {}
    public function SetMatch(LasVegasCityContext $ctx): void {}
    public function PrePoint(LasVegasCityContext $ctx): void {}
    public function PreSpec(LasVegasCityContext $ctx): void {}
    public function PreRequest(LasVegasCityContext $ctx): void {}
    public function PreResponse(LasVegasCityContext $ctx): void {}
    public function PreResult(LasVegasCityContext $ctx): void {}
    public function PreDone(LasVegasCityContext $ctx): void {}
    public function PreUnexpected(LasVegasCityContext $ctx): void {}
}

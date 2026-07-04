<?php
declare(strict_types=1);

// LasVegasCity SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class LasVegasCitySDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new LasVegasCityUtility();
        $this->_utility = $utility;

        $config = LasVegasCityConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = LasVegasCityHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = LasVegasCityHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, LasVegasCityFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return LasVegasCityUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = LasVegasCityHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = LasVegasCityHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = LasVegasCityHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new LasVegasCitySpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = LasVegasCityHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = LasVegasCityHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_city_info = null;

    // Canonical facade: $client->CityInfo()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->city_info()
    // resolves here too.
    public function CityInfo($data = null)
    {
        require_once __DIR__ . '/entity/city_info_entity.php';
        if ($data === null) {
            if ($this->_city_info === null) {
                $this->_city_info = new CityInfoEntity($this, null);
            }
            return $this->_city_info;
        }
        return new CityInfoEntity($this, $data);
    }


    private $_council = null;

    // Canonical facade: $client->Council()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->council()
    // resolves here too.
    public function Council($data = null)
    {
        require_once __DIR__ . '/entity/council_entity.php';
        if ($data === null) {
            if ($this->_council === null) {
                $this->_council = new CouncilEntity($this, null);
            }
            return $this->_council;
        }
        return new CouncilEntity($this, $data);
    }


    private $_department = null;

    // Canonical facade: $client->Department()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->department()
    // resolves here too.
    public function Department($data = null)
    {
        require_once __DIR__ . '/entity/department_entity.php';
        if ($data === null) {
            if ($this->_department === null) {
                $this->_department = new DepartmentEntity($this, null);
            }
            return $this->_department;
        }
        return new DepartmentEntity($this, $data);
    }


    private $_economic_development = null;

    // Canonical facade: $client->EconomicDevelopment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->economic_development()
    // resolves here too.
    public function EconomicDevelopment($data = null)
    {
        require_once __DIR__ . '/entity/economic_development_entity.php';
        if ($data === null) {
            if ($this->_economic_development === null) {
                $this->_economic_development = new EconomicDevelopmentEntity($this, null);
            }
            return $this->_economic_development;
        }
        return new EconomicDevelopmentEntity($this, $data);
    }


    private $_event = null;

    // Canonical facade: $client->Event()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->event()
    // resolves here too.
    public function Event($data = null)
    {
        require_once __DIR__ . '/entity/event_entity.php';
        if ($data === null) {
            if ($this->_event === null) {
                $this->_event = new EventEntity($this, null);
            }
            return $this->_event;
        }
        return new EventEntity($this, $data);
    }


    private $_job = null;

    // Canonical facade: $client->Job()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->job()
    // resolves here too.
    public function Job($data = null)
    {
        require_once __DIR__ . '/entity/job_entity.php';
        if ($data === null) {
            if ($this->_job === null) {
                $this->_job = new JobEntity($this, null);
            }
            return $this->_job;
        }
        return new JobEntity($this, $data);
    }


    private $_meeting = null;

    // Canonical facade: $client->Meeting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->meeting()
    // resolves here too.
    public function Meeting($data = null)
    {
        require_once __DIR__ . '/entity/meeting_entity.php';
        if ($data === null) {
            if ($this->_meeting === null) {
                $this->_meeting = new MeetingEntity($this, null);
            }
            return $this->_meeting;
        }
        return new MeetingEntity($this, $data);
    }


    private $_new = null;

    // Canonical facade: $client->New()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->new()
    // resolves here too.
    public function New($data = null)
    {
        require_once __DIR__ . '/entity/new_entity.php';
        if ($data === null) {
            if ($this->_new === null) {
                $this->_new = new NewEntity($this, null);
            }
            return $this->_new;
        }
        return new NewEntity($this, $data);
    }


    private $_park = null;

    // Canonical facade: $client->Park()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->park()
    // resolves here too.
    public function Park($data = null)
    {
        require_once __DIR__ . '/entity/park_entity.php';
        if ($data === null) {
            if ($this->_park === null) {
                $this->_park = new ParkEntity($this, null);
            }
            return $this->_park;
        }
        return new ParkEntity($this, $data);
    }


    private $_permit = null;

    // Canonical facade: $client->Permit()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->permit()
    // resolves here too.
    public function Permit($data = null)
    {
        require_once __DIR__ . '/entity/permit_entity.php';
        if ($data === null) {
            if ($this->_permit === null) {
                $this->_permit = new PermitEntity($this, null);
            }
            return $this->_permit;
        }
        return new PermitEntity($this, $data);
    }


    private $_public_safety = null;

    // Canonical facade: $client->PublicSafety()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->public_safety()
    // resolves here too.
    public function PublicSafety($data = null)
    {
        require_once __DIR__ . '/entity/public_safety_entity.php';
        if ($data === null) {
            if ($this->_public_safety === null) {
                $this->_public_safety = new PublicSafetyEntity($this, null);
            }
            return $this->_public_safety;
        }
        return new PublicSafetyEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new LasVegasCitySDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}

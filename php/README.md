# LasVegasCity PHP SDK



The PHP SDK for the LasVegasCity API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->CityInfo()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/las-vegas-city-sdk/releases](https://github.com/voxgig-sdk/las-vegas-city-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'lasvegascity_sdk.php';

$client = new LasVegasCitySDK();
```

### 3. Load a cityinfo

```php
try {
    // load() returns the ENTITY — call data_get() for the CityInfo record (throws on error).
    $cityinfo = $client->CityInfo()->load();
    print_r($cityinfo);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $councils = $client->Council()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = LasVegasCitySDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$council = $client->Council()->list();
print_r($council);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new LasVegasCitySDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
LAS_VEGAS_CITY_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### LasVegasCitySDK

```php
require_once 'lasvegascity_sdk.php';
$client = new LasVegasCitySDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = LasVegasCitySDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### LasVegasCitySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `CityInfo` | `($data): CityInfoEntity` | Create a CityInfo entity instance. |
| `Council` | `($data): CouncilEntity` | Create a Council entity instance. |
| `Department` | `($data): DepartmentEntity` | Create a Department entity instance. |
| `EconomicDevelopment` | `($data): EconomicDevelopmentEntity` | Create an EconomicDevelopment entity instance. |
| `Event` | `($data): EventEntity` | Create an Event entity instance. |
| `Job` | `($data): JobEntity` | Create a Job entity instance. |
| `Meeting` | `($data): MeetingEntity` | Create a Meeting entity instance. |
| `New` | `($data): NewEntity` | Create a New entity instance. |
| `Park` | `($data): ParkEntity` | Create a Park entity instance. |
| `Permit` | `($data): PermitEntity` | Create a Permit entity instance. |
| `PublicSafety` | `($data): PublicSafetyEntity` | Create a PublicSafety entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### CityInfo

| Field | Description |
| --- | --- |
| `address` |  |
| `annualVisitors` |  |
| `established` |  |
| `name` |  |
| `numberOfParks` |  |
| `phone` |  |
| `squareMiles` |  |

Operations: Load.

API path: `/city-info`

#### Council

| Field | Description |
| --- | --- |
| `bio` |  |
| `email` |  |
| `id` |  |
| `name` |  |
| `phone` |  |
| `title` |  |
| `ward` |  |

Operations: List.

API path: `/council`

#### Department

| Field | Description |
| --- | --- |
| `contact` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `services` |  |
| `url` |  |

Operations: List.

API path: `/departments`

#### EconomicDevelopment

| Field | Description |
| --- | --- |
| `industries` |  |
| `initiatives` |  |
| `resources` |  |

Operations: List.

API path: `/business/economic-development`

#### Event

| Field | Description |
| --- | --- |
| `category` |  |
| `description` |  |
| `endDate` |  |
| `id` |  |
| `isFree` |  |
| `location` |  |
| `startDate` |  |
| `ticketUrl` |  |
| `title` |  |

Operations: List.

API path: `/events`

#### Job

| Field | Description |
| --- | --- |
| `applicationUrl` |  |
| `category` |  |
| `closeDate` |  |
| `department` |  |
| `description` |  |
| `id` |  |
| `postDate` |  |
| `requirements` |  |
| `salaryRange` |  |
| `title` |  |

Operations: List.

API path: `/jobs`

#### Meeting

| Field | Description |
| --- | --- |
| `agendaUrl` |  |
| `date` |  |
| `id` |  |
| `location` |  |
| `minutesUrl` |  |
| `status` |  |
| `title` |  |
| `type` |  |

Operations: List.

API path: `/meetings`

#### New

| Field | Description |
| --- | --- |
| `author` |  |
| `category` |  |
| `content` |  |
| `id` |  |
| `publishDate` |  |
| `summary` |  |
| `title` |  |
| `url` |  |

Operations: List.

API path: `/news`

#### Park

| Field | Description |
| --- | --- |
| `address` |  |
| `amenities` |  |
| `hours` |  |
| `id` |  |
| `name` |  |
| `phone` |  |
| `type` |  |

Operations: List.

API path: `/parks`

#### Permit

| Field | Description |
| --- | --- |
| `applicationUrl` |  |
| `description` |  |
| `fee` |  |
| `id` |  |
| `name` |  |
| `processingTime` |  |
| `requirements` |  |
| `type` |  |

Operations: List.

API path: `/permits`

#### PublicSafety

| Field | Description |
| --- | --- |
| `fire` |  |
| `medical` |  |
| `police` |  |

Operations: Load.

API path: `/public-safety`



## Entities


### CityInfo

Create an instance: `$city_info = $client->CityInfo();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `annualVisitors` | `float` |  |
| `established` | `int` |  |
| `name` | `string` |  |
| `numberOfParks` | `int` |  |
| `phone` | `string` |  |
| `squareMiles` | `float` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CityInfo record (throws on error).
$city_info = $client->CityInfo()->load();
```


### Council

Create an instance: `$council = $client->Council();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `string` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `phone` | `string` |  |
| `title` | `string` |  |
| `ward` | `string` |  |

#### Example: List

```php
// list() returns an array of Council records (throws on error).
$councils = $client->Council()->list();
```


### Department

Create an instance: `$department = $client->Department();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contact` | `array` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `services` | `array` |  |
| `url` | `string` |  |

#### Example: List

```php
// list() returns an array of Department records (throws on error).
$departments = $client->Department()->list();
```


### EconomicDevelopment

Create an instance: `$economic_development = $client->EconomicDevelopment();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `industries` | `array` |  |
| `initiatives` | `array` |  |
| `resources` | `array` |  |

#### Example: List

```php
// list() returns an array of EconomicDevelopment records (throws on error).
$economic_developments = $client->EconomicDevelopment()->list();
```


### Event

Create an instance: `$event = $client->Event();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `description` | `string` |  |
| `endDate` | `string` |  |
| `id` | `string` |  |
| `isFree` | `bool` |  |
| `location` | `string` |  |
| `startDate` | `string` |  |
| `ticketUrl` | `string` |  |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of Event records (throws on error).
$events = $client->Event()->list();
```


### Job

Create an instance: `$job = $client->Job();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicationUrl` | `string` |  |
| `category` | `string` |  |
| `closeDate` | `string` |  |
| `department` | `string` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `postDate` | `string` |  |
| `requirements` | `array` |  |
| `salaryRange` | `array` |  |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of Job records (throws on error).
$jobs = $client->Job()->list();
```


### Meeting

Create an instance: `$meeting = $client->Meeting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agendaUrl` | `string` |  |
| `date` | `string` |  |
| `id` | `string` |  |
| `location` | `string` |  |
| `minutesUrl` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |

#### Example: List

```php
// list() returns an array of Meeting records (throws on error).
$meetings = $client->Meeting()->list();
```


### New

Create an instance: `$new = $client->New();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` |  |
| `category` | `string` |  |
| `content` | `string` |  |
| `id` | `string` |  |
| `publishDate` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: List

```php
// list() returns an array of New records (throws on error).
$news = $client->New()->list();
```


### Park

Create an instance: `$park = $client->Park();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `amenities` | `array` |  |
| `hours` | `array` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `phone` | `string` |  |
| `type` | `string` |  |

#### Example: List

```php
// list() returns an array of Park records (throws on error).
$parks = $client->Park()->list();
```


### Permit

Create an instance: `$permit = $client->Permit();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicationUrl` | `string` |  |
| `description` | `string` |  |
| `fee` | `float` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `processingTime` | `string` |  |
| `requirements` | `array` |  |
| `type` | `string` |  |

#### Example: List

```php
// list() returns an array of Permit records (throws on error).
$permits = $client->Permit()->list();
```


### PublicSafety

Create an instance: `$public_safety = $client->PublicSafety();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fire` | `array` |  |
| `medical` | `array` |  |
| `police` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PublicSafety record (throws on error).
$public_safety = $client->PublicSafety()->load();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── lasvegascity_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`lasvegascity_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$council = $client->Council();
$council->list();

// $council->data_get() now returns the council data from the last list
// $council->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

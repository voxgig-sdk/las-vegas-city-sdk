# LasVegasCity PHP SDK Reference

Complete API reference for the LasVegasCity PHP SDK.


## LasVegasCitySDK

### Constructor

```php
require_once __DIR__ . '/lasvegascity_sdk.php';

$client = new LasVegasCitySDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LasVegasCitySDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = LasVegasCitySDK::test();
```


### Instance Methods

#### `CityInfo($data = null)`

Create a new `CityInfoEntity` instance. Pass `null` for no initial data.

#### `Council($data = null)`

Create a new `CouncilEntity` instance. Pass `null` for no initial data.

#### `Department($data = null)`

Create a new `DepartmentEntity` instance. Pass `null` for no initial data.

#### `EconomicDevelopment($data = null)`

Create a new `EconomicDevelopmentEntity` instance. Pass `null` for no initial data.

#### `Event($data = null)`

Create a new `EventEntity` instance. Pass `null` for no initial data.

#### `Job($data = null)`

Create a new `JobEntity` instance. Pass `null` for no initial data.

#### `Meeting($data = null)`

Create a new `MeetingEntity` instance. Pass `null` for no initial data.

#### `New($data = null)`

Create a new `NewEntity` instance. Pass `null` for no initial data.

#### `Park($data = null)`

Create a new `ParkEntity` instance. Pass `null` for no initial data.

#### `Permit($data = null)`

Create a new `PermitEntity` instance. Pass `null` for no initial data.

#### `PublicSafety($data = null)`

Create a new `PublicSafetyEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): LasVegasCityUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CityInfoEntity

```php
$city_info = $client->CityInfo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `annualVisitors` | `float` | No |  |
| `established` | `int` | No |  |
| `name` | `string` | No |  |
| `numberOfParks` | `int` | No |  |
| `phone` | `string` | No |  |
| `squareMiles` | `float` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CityInfo()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CityInfoEntity`

Create a new `CityInfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CouncilEntity

```php
$council = $client->Council();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `phone` | `string` | No |  |
| `title` | `string` | No |  |
| `ward` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Council()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CouncilEntity`

Create a new `CouncilEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DepartmentEntity

```php
$department = $client->Department();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | `array` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `services` | `array` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Department()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DepartmentEntity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EconomicDevelopmentEntity

```php
$economic_development = $client->EconomicDevelopment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `industries` | `array` | No |  |
| `initiatives` | `array` | No |  |
| `resources` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->EconomicDevelopment()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EconomicDevelopmentEntity`

Create a new `EconomicDevelopmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventEntity

```php
$event = $client->Event();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No |  |
| `description` | `string` | No |  |
| `endDate` | `string` | No |  |
| `id` | `string` | No |  |
| `isFree` | `bool` | No |  |
| `location` | `string` | No |  |
| `startDate` | `string` | No |  |
| `ticketUrl` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Event()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventEntity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## JobEntity

```php
$job = $client->Job();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applicationUrl` | `string` | No |  |
| `category` | `string` | No |  |
| `closeDate` | `string` | No |  |
| `department` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `postDate` | `string` | No |  |
| `requirements` | `array` | No |  |
| `salaryRange` | `array` | No |  |
| `title` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Job()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): JobEntity`

Create a new `JobEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MeetingEntity

```php
$meeting = $client->Meeting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agendaUrl` | `string` | No |  |
| `date` | `string` | No |  |
| `id` | `string` | No |  |
| `location` | `string` | No |  |
| `minutesUrl` | `string` | No |  |
| `status` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Meeting()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeetingEntity`

Create a new `MeetingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NewEntity

```php
$new = $client->New();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No |  |
| `category` | `string` | No |  |
| `content` | `string` | No |  |
| `id` | `string` | No |  |
| `publishDate` | `string` | No |  |
| `summary` | `string` | No |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->New()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NewEntity`

Create a new `NewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ParkEntity

```php
$park = $client->Park();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `amenities` | `array` | No |  |
| `hours` | `array` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `phone` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Park()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ParkEntity`

Create a new `ParkEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PermitEntity

```php
$permit = $client->Permit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applicationUrl` | `string` | No |  |
| `description` | `string` | No |  |
| `fee` | `float` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `processingTime` | `string` | No |  |
| `requirements` | `array` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Permit()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PermitEntity`

Create a new `PermitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PublicSafetyEntity

```php
$public_safety = $client->PublicSafety();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fire` | `array` | No |  |
| `medical` | `array` | No |  |
| `police` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PublicSafety()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PublicSafetyEntity`

Create a new `PublicSafetyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new LasVegasCitySDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


# LasVegasCity PHP SDK Reference

Complete API reference for the LasVegasCity PHP SDK.


## LasVegasCitySDK

### Constructor

```php
require_once __DIR__ . '/las-vegas-city_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
| `address` | ``$STRING`` | No |  |
| `annual_visitor` | ``$NUMBER`` | No |  |
| `established` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `number_of_park` | ``$INTEGER`` | No |  |
| `phone` | ``$STRING`` | No |  |
| `square_mile` | ``$NUMBER`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CityInfo()->load(["id" => "city_info_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CityInfoEntity`

Create a new `CityInfoEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CouncilEntity

```php
$council = $client->Council();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `phone` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `ward` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Council()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CouncilEntity`

Create a new `CouncilEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DepartmentEntity

```php
$department = $client->Department();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `service` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Department()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DepartmentEntity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EconomicDevelopmentEntity

```php
$economic_development = $client->EconomicDevelopment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `industry` | ``$ARRAY`` | No |  |
| `initiatif` | ``$ARRAY`` | No |  |
| `resource` | ``$ARRAY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->EconomicDevelopment()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EconomicDevelopmentEntity`

Create a new `EconomicDevelopmentEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EventEntity

```php
$event = $client->Event();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `end_date` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `is_free` | ``$BOOLEAN`` | No |  |
| `location` | ``$STRING`` | No |  |
| `start_date` | ``$STRING`` | No |  |
| `ticket_url` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Event()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EventEntity`

Create a new `EventEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## JobEntity

```php
$job = $client->Job();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_url` | ``$STRING`` | No |  |
| `category` | ``$STRING`` | No |  |
| `close_date` | ``$STRING`` | No |  |
| `department` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `post_date` | ``$STRING`` | No |  |
| `requirement` | ``$ARRAY`` | No |  |
| `salary_range` | ``$OBJECT`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Job()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): JobEntity`

Create a new `JobEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MeetingEntity

```php
$meeting = $client->Meeting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda_url` | ``$STRING`` | No |  |
| `date` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `location` | ``$STRING`` | No |  |
| `minutes_url` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Meeting()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MeetingEntity`

Create a new `MeetingEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## NewEntity

```php
$new = $client->New();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | ``$STRING`` | No |  |
| `category` | ``$STRING`` | No |  |
| `content` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `publish_date` | ``$STRING`` | No |  |
| `summary` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->New()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NewEntity`

Create a new `NewEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ParkEntity

```php
$park = $client->Park();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$STRING`` | No |  |
| `amenity` | ``$ARRAY`` | No |  |
| `hour` | ``$OBJECT`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `phone` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Park()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ParkEntity`

Create a new `ParkEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PermitEntity

```php
$permit = $client->Permit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_url` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `fee` | ``$NUMBER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `processing_time` | ``$STRING`` | No |  |
| `requirement` | ``$ARRAY`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Permit()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PermitEntity`

Create a new `PermitEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PublicSafetyEntity

```php
$public_safety = $client->PublicSafety();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fire` | ``$OBJECT`` | No |  |
| `medical` | ``$OBJECT`` | No |  |
| `police` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PublicSafety()->load(["id" => "public_safety_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PublicSafetyEntity`

Create a new `PublicSafetyEntity` instance with the same client and
options.

#### `getName(): string`

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


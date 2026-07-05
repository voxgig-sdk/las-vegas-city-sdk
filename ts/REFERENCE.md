# LasVegasCity TypeScript SDK Reference

Complete API reference for the LasVegasCity TypeScript SDK.


## LasVegasCitySDK

### Constructor

```ts
new LasVegasCitySDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LasVegasCitySDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LasVegasCitySDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LasVegasCitySDK` instance in test mode.


### Instance Methods

#### `CityInfo(data?: object)`

Create a new `CityInfo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CityInfoEntity` instance.

#### `Council(data?: object)`

Create a new `Council` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CouncilEntity` instance.

#### `Department(data?: object)`

Create a new `Department` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DepartmentEntity` instance.

#### `EconomicDevelopment(data?: object)`

Create a new `EconomicDevelopment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EconomicDevelopmentEntity` instance.

#### `Event(data?: object)`

Create a new `Event` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventEntity` instance.

#### `Job(data?: object)`

Create a new `Job` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `JobEntity` instance.

#### `Meeting(data?: object)`

Create a new `Meeting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeetingEntity` instance.

#### `New(data?: object)`

Create a new `New` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NewEntity` instance.

#### `Park(data?: object)`

Create a new `Park` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ParkEntity` instance.

#### `Permit(data?: object)`

Create a new `Permit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PermitEntity` instance.

#### `PublicSafety(data?: object)`

Create a new `PublicSafety` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicSafetyEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LasVegasCitySDK.test()`.

**Returns:** `LasVegasCitySDK` instance in test mode.


---

## CityInfoEntity

```ts
const city_info = client.CityInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `annual_visitor` | `number` | No |  |
| `established` | `number` | No |  |
| `name` | `string` | No |  |
| `number_of_park` | `number` | No |  |
| `phone` | `string` | No |  |
| `square_mile` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CityInfo().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CityInfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CouncilEntity

```ts
const council = client.Council()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Council().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CouncilEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DepartmentEntity

```ts
const department = client.Department()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | `Record<string, any>` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `service` | `any[]` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Department().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EconomicDevelopmentEntity

```ts
const economic_development = client.EconomicDevelopment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `industry` | `any[]` | No |  |
| `initiatif` | `any[]` | No |  |
| `resource` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EconomicDevelopment().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EconomicDevelopmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventEntity

```ts
const event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No |  |
| `description` | `string` | No |  |
| `end_date` | `string` | No |  |
| `id` | `string` | No |  |
| `is_free` | `boolean` | No |  |
| `location` | `string` | No |  |
| `start_date` | `string` | No |  |
| `ticket_url` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Event().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## JobEntity

```ts
const job = client.Job()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_url` | `string` | No |  |
| `category` | `string` | No |  |
| `close_date` | `string` | No |  |
| `department` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `post_date` | `string` | No |  |
| `requirement` | `any[]` | No |  |
| `salary_range` | `Record<string, any>` | No |  |
| `title` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Job().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `JobEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeetingEntity

```ts
const meeting = client.Meeting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda_url` | `string` | No |  |
| `date` | `string` | No |  |
| `id` | `string` | No |  |
| `location` | `string` | No |  |
| `minutes_url` | `string` | No |  |
| `status` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Meeting().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeetingEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NewEntity

```ts
const new_ = client.New()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No |  |
| `category` | `string` | No |  |
| `content` | `string` | No |  |
| `id` | `string` | No |  |
| `publish_date` | `string` | No |  |
| `summary` | `string` | No |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.New().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NewEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ParkEntity

```ts
const park = client.Park()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `amenity` | `any[]` | No |  |
| `hour` | `Record<string, any>` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `phone` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Park().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ParkEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PermitEntity

```ts
const permit = client.Permit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_url` | `string` | No |  |
| `description` | `string` | No |  |
| `fee` | `number` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `processing_time` | `string` | No |  |
| `requirement` | `any[]` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Permit().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PermitEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PublicSafetyEntity

```ts
const public_safety = client.PublicSafety()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fire` | `Record<string, any>` | No |  |
| `medical` | `Record<string, any>` | No |  |
| `police` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PublicSafety().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PublicSafetyEntity` instance with the same client and
options.

#### `client()`

Return the parent `LasVegasCitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new LasVegasCitySDK({
  feature: {
    test: { active: true },
  }
})
```


# LasVegasCity Golang SDK Reference

Complete API reference for the LasVegasCity Golang SDK.


## LasVegasCitySDK

### Constructor

```go
func NewLasVegasCitySDK(options map[string]any) *LasVegasCitySDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *LasVegasCitySDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *LasVegasCitySDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `CityInfo(data map[string]any) LasVegasCityEntity`

Create a new `CityInfo` entity instance. Pass `nil` for no initial data.

#### `Council(data map[string]any) LasVegasCityEntity`

Create a new `Council` entity instance. Pass `nil` for no initial data.

#### `Department(data map[string]any) LasVegasCityEntity`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `EconomicDevelopment(data map[string]any) LasVegasCityEntity`

Create a new `EconomicDevelopment` entity instance. Pass `nil` for no initial data.

#### `Event(data map[string]any) LasVegasCityEntity`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Job(data map[string]any) LasVegasCityEntity`

Create a new `Job` entity instance. Pass `nil` for no initial data.

#### `Meeting(data map[string]any) LasVegasCityEntity`

Create a new `Meeting` entity instance. Pass `nil` for no initial data.

#### `New(data map[string]any) LasVegasCityEntity`

Create a new `New` entity instance. Pass `nil` for no initial data.

#### `Park(data map[string]any) LasVegasCityEntity`

Create a new `Park` entity instance. Pass `nil` for no initial data.

#### `Permit(data map[string]any) LasVegasCityEntity`

Create a new `Permit` entity instance. Pass `nil` for no initial data.

#### `PublicSafety(data map[string]any) LasVegasCityEntity`

Create a new `PublicSafety` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CityInfoEntity

```go
city_info := client.CityInfo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `annual_visitor` | `float64` | No |  |
| `established` | `int` | No |  |
| `name` | `string` | No |  |
| `number_of_park` | `int` | No |  |
| `phone` | `string` | No |  |
| `square_mile` | `float64` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CityInfo(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CityInfoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CouncilEntity

```go
council := client.Council(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Council(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CouncilEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DepartmentEntity

```go
department := client.Department(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | `map[string]any` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `service` | `[]any` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Department(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EconomicDevelopmentEntity

```go
economic_development := client.EconomicDevelopment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `industry` | `[]any` | No |  |
| `initiatif` | `[]any` | No |  |
| `resource` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.EconomicDevelopment(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EconomicDevelopmentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventEntity

```go
event := client.Event(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No |  |
| `description` | `string` | No |  |
| `end_date` | `string` | No |  |
| `id` | `string` | No |  |
| `is_free` | `bool` | No |  |
| `location` | `string` | No |  |
| `start_date` | `string` | No |  |
| `ticket_url` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Event(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## JobEntity

```go
job := client.Job(nil)
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
| `requirement` | `[]any` | No |  |
| `salary_range` | `map[string]any` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Job(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `JobEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MeetingEntity

```go
meeting := client.Meeting(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Meeting(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeetingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NewEntity

```go
new := client.New(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.New(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NewEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ParkEntity

```go
park := client.Park(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `amenity` | `[]any` | No |  |
| `hour` | `map[string]any` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `phone` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Park(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ParkEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PermitEntity

```go
permit := client.Permit(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_url` | `string` | No |  |
| `description` | `string` | No |  |
| `fee` | `float64` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `processing_time` | `string` | No |  |
| `requirement` | `[]any` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Permit(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PermitEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PublicSafetyEntity

```go
public_safety := client.PublicSafety(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fire` | `map[string]any` | No |  |
| `medical` | `map[string]any` | No |  |
| `police` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PublicSafety(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PublicSafetyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewLasVegasCitySDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```


# LasVegasCity Lua SDK Reference

Complete API reference for the LasVegasCity Lua SDK.


## LasVegasCitySDK

### Constructor

```lua
local sdk = require("las-vegas-city_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `CityInfo(data)`

Create a new `CityInfo` entity instance. Pass `nil` for no initial data.

#### `Council(data)`

Create a new `Council` entity instance. Pass `nil` for no initial data.

#### `Department(data)`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `EconomicDevelopment(data)`

Create a new `EconomicDevelopment` entity instance. Pass `nil` for no initial data.

#### `Event(data)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Job(data)`

Create a new `Job` entity instance. Pass `nil` for no initial data.

#### `Meeting(data)`

Create a new `Meeting` entity instance. Pass `nil` for no initial data.

#### `New(data)`

Create a new `New` entity instance. Pass `nil` for no initial data.

#### `Park(data)`

Create a new `Park` entity instance. Pass `nil` for no initial data.

#### `Permit(data)`

Create a new `Permit` entity instance. Pass `nil` for no initial data.

#### `PublicSafety(data)`

Create a new `PublicSafety` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CityInfoEntity

```lua
local city_info = client:CityInfo(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:CityInfo():load({ id = "city_info_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CityInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CouncilEntity

```lua
local council = client:Council(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Council():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CouncilEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DepartmentEntity

```lua
local department = client:Department(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Department():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EconomicDevelopmentEntity

```lua
local economic_development = client:EconomicDevelopment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `industry` | ``$ARRAY`` | No |  |
| `initiatif` | ``$ARRAY`` | No |  |
| `resource` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:EconomicDevelopment():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EconomicDevelopmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EventEntity

```lua
local event = client:Event(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Event():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## JobEntity

```lua
local job = client:Job(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Job():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JobEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeetingEntity

```lua
local meeting = client:Meeting(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Meeting():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NewEntity

```lua
local new = client:New(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:New():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ParkEntity

```lua
local park = client:Park(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Park():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ParkEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PermitEntity

```lua
local permit = client:Permit(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Permit():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PermitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PublicSafetyEntity

```lua
local public_safety = client:PublicSafety(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fire` | ``$OBJECT`` | No |  |
| `medical` | ``$OBJECT`` | No |  |
| `police` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PublicSafety():load({ id = "public_safety_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicSafetyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


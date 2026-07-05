# LasVegasCity Ruby SDK Reference

Complete API reference for the LasVegasCity Ruby SDK.


## LasVegasCitySDK

### Constructor

```ruby
require_relative 'LasVegasCity_sdk'

client = LasVegasCitySDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LasVegasCitySDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = LasVegasCitySDK.test
```


### Instance Methods

#### `CityInfo(data = nil)`

Create a new `CityInfo` entity instance. Pass `nil` for no initial data.

#### `Council(data = nil)`

Create a new `Council` entity instance. Pass `nil` for no initial data.

#### `Department(data = nil)`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `EconomicDevelopment(data = nil)`

Create a new `EconomicDevelopment` entity instance. Pass `nil` for no initial data.

#### `Event(data = nil)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Job(data = nil)`

Create a new `Job` entity instance. Pass `nil` for no initial data.

#### `Meeting(data = nil)`

Create a new `Meeting` entity instance. Pass `nil` for no initial data.

#### `New(data = nil)`

Create a new `New` entity instance. Pass `nil` for no initial data.

#### `Park(data = nil)`

Create a new `Park` entity instance. Pass `nil` for no initial data.

#### `Permit(data = nil)`

Create a new `Permit` entity instance. Pass `nil` for no initial data.

#### `PublicSafety(data = nil)`

Create a new `PublicSafety` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CityInfoEntity

```ruby
city_info = client.CityInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `String` | No |  |
| `annual_visitor` | `Float` | No |  |
| `established` | `Integer` | No |  |
| `name` | `String` | No |  |
| `number_of_park` | `Integer` | No |  |
| `phone` | `String` | No |  |
| `square_mile` | `Float` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CityInfo.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CityInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CouncilEntity

```ruby
council = client.Council
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `String` | No |  |
| `email` | `String` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `phone` | `String` | No |  |
| `title` | `String` | No |  |
| `ward` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Council.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CouncilEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DepartmentEntity

```ruby
department = client.Department
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | `Hash` | No |  |
| `description` | `String` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `service` | `Array` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Department.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EconomicDevelopmentEntity

```ruby
economic_development = client.EconomicDevelopment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `industry` | `Array` | No |  |
| `initiatif` | `Array` | No |  |
| `resource` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.EconomicDevelopment.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EconomicDevelopmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EventEntity

```ruby
event = client.Event
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `String` | No |  |
| `description` | `String` | No |  |
| `end_date` | `String` | No |  |
| `id` | `String` | No |  |
| `is_free` | `Boolean` | No |  |
| `location` | `String` | No |  |
| `start_date` | `String` | No |  |
| `ticket_url` | `String` | No |  |
| `title` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Event.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## JobEntity

```ruby
job = client.Job
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_url` | `String` | No |  |
| `category` | `String` | No |  |
| `close_date` | `String` | No |  |
| `department` | `String` | No |  |
| `description` | `String` | No |  |
| `id` | `String` | No |  |
| `post_date` | `String` | No |  |
| `requirement` | `Array` | No |  |
| `salary_range` | `Hash` | No |  |
| `title` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Job.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `JobEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MeetingEntity

```ruby
meeting = client.Meeting
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda_url` | `String` | No |  |
| `date` | `String` | No |  |
| `id` | `String` | No |  |
| `location` | `String` | No |  |
| `minutes_url` | `String` | No |  |
| `status` | `String` | No |  |
| `title` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Meeting.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MeetingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NewEntity

```ruby
new = client.New
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `String` | No |  |
| `category` | `String` | No |  |
| `content` | `String` | No |  |
| `id` | `String` | No |  |
| `publish_date` | `String` | No |  |
| `summary` | `String` | No |  |
| `title` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.New.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ParkEntity

```ruby
park = client.Park
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `String` | No |  |
| `amenity` | `Array` | No |  |
| `hour` | `Hash` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `phone` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Park.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ParkEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PermitEntity

```ruby
permit = client.Permit
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_url` | `String` | No |  |
| `description` | `String` | No |  |
| `fee` | `Float` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `processing_time` | `String` | No |  |
| `requirement` | `Array` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Permit.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PermitEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PublicSafetyEntity

```ruby
public_safety = client.PublicSafety
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fire` | `Hash` | No |  |
| `medical` | `Hash` | No |  |
| `police` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PublicSafety.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PublicSafetyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = LasVegasCitySDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```


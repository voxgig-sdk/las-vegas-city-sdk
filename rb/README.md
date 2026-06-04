# LasVegasCity Ruby SDK

The Ruby SDK for the LasVegasCity API. Provides an entity-oriented interface using idiomatic Ruby conventions.


## Install
```bash
gem install las-vegas-city-sdk
```

Or add to your `Gemfile`:

```ruby
gem "las-vegas-city-sdk"
```

Then run:

```bash
bundle install
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "LasVegasCity_sdk"

client = LasVegasCitySDK.new({})
```

### 3. Load a cityinfo

```ruby
result, err = client.CityInfo(nil).load({ "id" => "example_id" }, nil)
raise err if err
puts result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
raise err if err

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
end
```

### Prepare a request without sending it

```ruby
fetchdef, err = client.prepare({
  "path" => "/api/resource/{id}",
  "method" => "DELETE",
  "params" => { "id" => "example" },
})
raise err if err

puts fetchdef["url"]
puts fetchdef["method"]
puts fetchdef["headers"]
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = LasVegasCitySDK.test(nil, nil)

result, err = client.LasVegasCity(nil).load(
  { "id" => "test01" }, nil
)
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = LasVegasCitySDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LAS-VEGAS-CITY_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### LasVegasCitySDK

```ruby
require_relative "LasVegasCity_sdk"
client = LasVegasCitySDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = LasVegasCitySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LasVegasCitySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> [Hash, err]` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> [Hash, err]` | Build and send an HTTP request. |
| `CityInfo` | `(data) -> CityInfoEntity` | Create a CityInfo entity instance. |
| `Council` | `(data) -> CouncilEntity` | Create a Council entity instance. |
| `Department` | `(data) -> DepartmentEntity` | Create a Department entity instance. |
| `EconomicDevelopment` | `(data) -> EconomicDevelopmentEntity` | Create a EconomicDevelopment entity instance. |
| `Event` | `(data) -> EventEntity` | Create a Event entity instance. |
| `Job` | `(data) -> JobEntity` | Create a Job entity instance. |
| `Meeting` | `(data) -> MeetingEntity` | Create a Meeting entity instance. |
| `New` | `(data) -> NewEntity` | Create a New entity instance. |
| `Park` | `(data) -> ParkEntity` | Create a Park entity instance. |
| `Permit` | `(data) -> PermitEntity` | Create a Permit entity instance. |
| `PublicSafety` | `(data) -> PublicSafetyEntity` | Create a PublicSafety entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> [any, err]` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> [any, err]` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> [any, err]` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> [any, err]` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> [any, err]` | Remove an entity. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return `[any, err]`. The first value is a
`Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

### Entities

#### CityInfo

| Field | Description |
| --- | --- |
| `address` |  |
| `annual_visitor` |  |
| `established` |  |
| `name` |  |
| `number_of_park` |  |
| `phone` |  |
| `square_mile` |  |

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
| `service` |  |
| `url` |  |

Operations: List.

API path: `/departments`

#### EconomicDevelopment

| Field | Description |
| --- | --- |
| `industry` |  |
| `initiatif` |  |
| `resource` |  |

Operations: List.

API path: `/business/economic-development`

#### Event

| Field | Description |
| --- | --- |
| `category` |  |
| `description` |  |
| `end_date` |  |
| `id` |  |
| `is_free` |  |
| `location` |  |
| `start_date` |  |
| `ticket_url` |  |
| `title` |  |

Operations: List.

API path: `/events`

#### Job

| Field | Description |
| --- | --- |
| `application_url` |  |
| `category` |  |
| `close_date` |  |
| `department` |  |
| `description` |  |
| `id` |  |
| `post_date` |  |
| `requirement` |  |
| `salary_range` |  |
| `title` |  |

Operations: List.

API path: `/jobs`

#### Meeting

| Field | Description |
| --- | --- |
| `agenda_url` |  |
| `date` |  |
| `id` |  |
| `location` |  |
| `minutes_url` |  |
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
| `publish_date` |  |
| `summary` |  |
| `title` |  |
| `url` |  |

Operations: List.

API path: `/news`

#### Park

| Field | Description |
| --- | --- |
| `address` |  |
| `amenity` |  |
| `hour` |  |
| `id` |  |
| `name` |  |
| `phone` |  |
| `type` |  |

Operations: List.

API path: `/parks`

#### Permit

| Field | Description |
| --- | --- |
| `application_url` |  |
| `description` |  |
| `fee` |  |
| `id` |  |
| `name` |  |
| `processing_time` |  |
| `requirement` |  |
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

Create an instance: `const city_info = client.CityInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$STRING`` |  |
| `annual_visitor` | ``$NUMBER`` |  |
| `established` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `number_of_park` | ``$INTEGER`` |  |
| `phone` | ``$STRING`` |  |
| `square_mile` | ``$NUMBER`` |  |

#### Example: Load

```ts
const city_info = await client.CityInfo().load({ id: 'city_info_id' })
```


### Council

Create an instance: `const council = client.Council()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `phone` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `ward` | ``$STRING`` |  |

#### Example: List

```ts
const councils = await client.Council().list()
```


### Department

Create an instance: `const department = client.Department()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contact` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `service` | ``$ARRAY`` |  |
| `url` | ``$STRING`` |  |

#### Example: List

```ts
const departments = await client.Department().list()
```


### EconomicDevelopment

Create an instance: `const economic_development = client.EconomicDevelopment()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `industry` | ``$ARRAY`` |  |
| `initiatif` | ``$ARRAY`` |  |
| `resource` | ``$ARRAY`` |  |

#### Example: List

```ts
const economic_developments = await client.EconomicDevelopment().list()
```


### Event

Create an instance: `const event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `end_date` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `is_free` | ``$BOOLEAN`` |  |
| `location` | ``$STRING`` |  |
| `start_date` | ``$STRING`` |  |
| `ticket_url` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: List

```ts
const events = await client.Event().list()
```


### Job

Create an instance: `const job = client.Job()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_url` | ``$STRING`` |  |
| `category` | ``$STRING`` |  |
| `close_date` | ``$STRING`` |  |
| `department` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `post_date` | ``$STRING`` |  |
| `requirement` | ``$ARRAY`` |  |
| `salary_range` | ``$OBJECT`` |  |
| `title` | ``$STRING`` |  |

#### Example: List

```ts
const jobs = await client.Job().list()
```


### Meeting

Create an instance: `const meeting = client.Meeting()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agenda_url` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `location` | ``$STRING`` |  |
| `minutes_url` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: List

```ts
const meetings = await client.Meeting().list()
```


### New

Create an instance: `const new = client.New()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | ``$STRING`` |  |
| `category` | ``$STRING`` |  |
| `content` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `publish_date` | ``$STRING`` |  |
| `summary` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: List

```ts
const news = await client.New().list()
```


### Park

Create an instance: `const park = client.Park()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$STRING`` |  |
| `amenity` | ``$ARRAY`` |  |
| `hour` | ``$OBJECT`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `phone` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: List

```ts
const parks = await client.Park().list()
```


### Permit

Create an instance: `const permit = client.Permit()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_url` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `fee` | ``$NUMBER`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `processing_time` | ``$STRING`` |  |
| `requirement` | ``$ARRAY`` |  |
| `type` | ``$STRING`` |  |

#### Example: List

```ts
const permits = await client.Permit().list()
```


### PublicSafety

Create an instance: `const public_safety = client.PublicSafety()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fire` | ``$OBJECT`` |  |
| `medical` | ``$OBJECT`` |  |
| `police` | ``$OBJECT`` |  |

#### Example: Load

```ts
const public_safety = await client.PublicSafety().load({ id: 'public_safety_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── LasVegasCity_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`LasVegasCity_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
moon = client.Moon
moon.load({ "planet_id" => "earth", "id" => "luna" })

# moon.data_get now returns the loaded moon data
# moon.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

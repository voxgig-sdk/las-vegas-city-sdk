# LasVegasCity Ruby SDK



The Ruby SDK for the LasVegasCity API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CityInfo` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/las-vegas-city-sdk/releases](https://github.com/voxgig-sdk/las-vegas-city-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "LasVegasCity_sdk"

client = LasVegasCitySDK.new
```

### 3. Load a cityinfo

```ruby
begin
  # load returns the ENTITY — call data_get for the CityInfo record (raises on error).
  cityinfo = client.CityInfo.load()
  puts cityinfo
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  councils = client.Council.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = LasVegasCitySDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
council = client.Council.list()
puts council
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
LAS_VEGAS_CITY_TEST_LIVE=TRUE
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
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `CityInfo` | `(data) -> CityInfoEntity` | Create a CityInfo entity instance. |
| `Council` | `(data) -> CouncilEntity` | Create a Council entity instance. |
| `Department` | `(data) -> DepartmentEntity` | Create a Department entity instance. |
| `EconomicDevelopment` | `(data) -> EconomicDevelopmentEntity` | Create an EconomicDevelopment entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `LasVegasCityError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `city_info = client.CityInfo`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `String` |  |
| `annualVisitors` | `Float` |  |
| `established` | `Integer` |  |
| `name` | `String` |  |
| `numberOfParks` | `Integer` |  |
| `phone` | `String` |  |
| `squareMiles` | `Float` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CityInfo record (raises on error).
city_info = client.CityInfo.load()
```


### Council

Create an instance: `council = client.Council`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `String` |  |
| `email` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `phone` | `String` |  |
| `title` | `String` |  |
| `ward` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Council records (raises on error).
councils = client.Council.list
```


### Department

Create an instance: `department = client.Department`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contact` | `Hash` |  |
| `description` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `services` | `Array` |  |
| `url` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Department records (raises on error).
departments = client.Department.list
```


### EconomicDevelopment

Create an instance: `economic_development = client.EconomicDevelopment`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `industries` | `Array` |  |
| `initiatives` | `Array` |  |
| `resources` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of EconomicDevelopment records (raises on error).
economic_developments = client.EconomicDevelopment.list
```


### Event

Create an instance: `event = client.Event`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `String` |  |
| `description` | `String` |  |
| `endDate` | `String` |  |
| `id` | `String` |  |
| `isFree` | `Boolean` |  |
| `location` | `String` |  |
| `startDate` | `String` |  |
| `ticketUrl` | `String` |  |
| `title` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Event records (raises on error).
events = client.Event.list
```


### Job

Create an instance: `job = client.Job`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicationUrl` | `String` |  |
| `category` | `String` |  |
| `closeDate` | `String` |  |
| `department` | `String` |  |
| `description` | `String` |  |
| `id` | `String` |  |
| `postDate` | `String` |  |
| `requirements` | `Array` |  |
| `salaryRange` | `Hash` |  |
| `title` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Job records (raises on error).
jobs = client.Job.list
```


### Meeting

Create an instance: `meeting = client.Meeting`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agendaUrl` | `String` |  |
| `date` | `String` |  |
| `id` | `String` |  |
| `location` | `String` |  |
| `minutesUrl` | `String` |  |
| `status` | `String` |  |
| `title` | `String` |  |
| `type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Meeting records (raises on error).
meetings = client.Meeting.list
```


### New

Create an instance: `new = client.New`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `String` |  |
| `category` | `String` |  |
| `content` | `String` |  |
| `id` | `String` |  |
| `publishDate` | `String` |  |
| `summary` | `String` |  |
| `title` | `String` |  |
| `url` | `String` |  |

#### Example: List

```ruby
# list returns an Array of New records (raises on error).
news = client.New.list
```


### Park

Create an instance: `park = client.Park`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `String` |  |
| `amenities` | `Array` |  |
| `hours` | `Hash` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `phone` | `String` |  |
| `type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Park records (raises on error).
parks = client.Park.list
```


### Permit

Create an instance: `permit = client.Permit`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicationUrl` | `String` |  |
| `description` | `String` |  |
| `fee` | `Float` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `processingTime` | `String` |  |
| `requirements` | `Array` |  |
| `type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Permit records (raises on error).
permits = client.Permit.list
```


### PublicSafety

Create an instance: `public_safety = client.PublicSafety`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fire` | `Hash` |  |
| `medical` | `Hash` |  |
| `police` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PublicSafety record (raises on error).
public_safety = client.PublicSafety.load()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
council = client.Council
council.list()

# council.data_get now returns the council data from the last list
# council.match_get returns the last match criteria
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

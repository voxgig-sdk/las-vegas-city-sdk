# LasVegasCity Lua SDK



The Lua SDK for the LasVegasCity API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:CityInfo()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/las-vegas-city-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("las-vegas-city_sdk")

local client = sdk.new()
```

### 3. Load a cityinfo

```lua
local cityinfo, err = client:CityInfo():load()
if err then error(err) end
print(cityinfo)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local councils, err = client:Council():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Council():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### LasVegasCitySDK

```lua
local sdk = require("las-vegas-city_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LasVegasCitySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local city_info, err = client:CityInfo():load()
    if err then error(err) end
    -- city_info is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local city_info = client:CityInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `annualVisitors` | `number` |  |
| `established` | `number` |  |
| `name` | `string` |  |
| `numberOfParks` | `number` |  |
| `phone` | `string` |  |
| `squareMiles` | `number` |  |

#### Example: Load

```lua
local city_info, err = client:CityInfo():load()
```


### Council

Create an instance: `local council = client:Council(nil)`

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

```lua
local councils, err = client:Council():list()
```


### Department

Create an instance: `local department = client:Department(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contact` | `table` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `services` | `table` |  |
| `url` | `string` |  |

#### Example: List

```lua
local departments, err = client:Department():list()
```


### EconomicDevelopment

Create an instance: `local economic_development = client:EconomicDevelopment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `industries` | `table` |  |
| `initiatives` | `table` |  |
| `resources` | `table` |  |

#### Example: List

```lua
local economic_developments, err = client:EconomicDevelopment():list()
```


### Event

Create an instance: `local event = client:Event(nil)`

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
| `isFree` | `boolean` |  |
| `location` | `string` |  |
| `startDate` | `string` |  |
| `ticketUrl` | `string` |  |
| `title` | `string` |  |

#### Example: List

```lua
local events, err = client:Event():list()
```


### Job

Create an instance: `local job = client:Job(nil)`

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
| `requirements` | `table` |  |
| `salaryRange` | `table` |  |
| `title` | `string` |  |

#### Example: List

```lua
local jobs, err = client:Job():list()
```


### Meeting

Create an instance: `local meeting = client:Meeting(nil)`

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

```lua
local meetings, err = client:Meeting():list()
```


### New

Create an instance: `local new = client:New(nil)`

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

```lua
local news, err = client:New():list()
```


### Park

Create an instance: `local park = client:Park(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `amenities` | `table` |  |
| `hours` | `table` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `phone` | `string` |  |
| `type` | `string` |  |

#### Example: List

```lua
local parks, err = client:Park():list()
```


### Permit

Create an instance: `local permit = client:Permit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicationUrl` | `string` |  |
| `description` | `string` |  |
| `fee` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `processingTime` | `string` |  |
| `requirements` | `table` |  |
| `type` | `string` |  |

#### Example: List

```lua
local permits, err = client:Permit():list()
```


### PublicSafety

Create an instance: `local public_safety = client:PublicSafety(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fire` | `table` |  |
| `medical` | `table` |  |
| `police` | `table` |  |

#### Example: Load

```lua
local public_safety, err = client:PublicSafety():load()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── las-vegas-city_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`las-vegas-city_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local council = client:Council()
council:list()

-- council:data_get() now returns the council data from the last list
-- council:match_get() returns the last match criteria
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

# LasVegasCity Lua SDK



The Lua SDK for the LasVegasCity API — an entity-oriented client using Lua conventions.

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
local cityinfo, err = client:CityInfo():load({ id = "example_id" })
if err then error(err) end
print(cityinfo)
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

local result, err = client:CityInfo():load({ id = "test01" })
-- result is the loaded data; err is set on failure
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
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
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
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local city_info, err = client:CityInfo():load({ id = "example_id" })
    if err then error(err) end
    -- city_info is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local city_info = client:CityInfo(nil)`

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

```lua
local city_info, err = client:CityInfo():load({ id = "city_info_id" })
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
| `bio` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `phone` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `ward` | ``$STRING`` |  |

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
| `contact` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `service` | ``$ARRAY`` |  |
| `url` | ``$STRING`` |  |

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
| `industry` | ``$ARRAY`` |  |
| `initiatif` | ``$ARRAY`` |  |
| `resource` | ``$ARRAY`` |  |

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
| `agenda_url` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `location` | ``$STRING`` |  |
| `minutes_url` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

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
| `author` | ``$STRING`` |  |
| `category` | ``$STRING`` |  |
| `content` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `publish_date` | ``$STRING`` |  |
| `summary` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

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
| `address` | ``$STRING`` |  |
| `amenity` | ``$ARRAY`` |  |
| `hour` | ``$OBJECT`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `phone` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

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
| `application_url` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `fee` | ``$NUMBER`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `processing_time` | ``$STRING`` |  |
| `requirement` | ``$ARRAY`` |  |
| `type` | ``$STRING`` |  |

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
| `fire` | ``$OBJECT`` |  |
| `medical` | ``$OBJECT`` |  |
| `police` | ``$OBJECT`` |  |

#### Example: Load

```lua
local public_safety, err = client:PublicSafety():load({ id = "public_safety_id" })
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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local cityinfo = client:CityInfo()
cityinfo:load({ id = "example_id" })

-- cityinfo:data_get() now returns the loaded cityinfo data
-- cityinfo:match_get() returns the last match criteria
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

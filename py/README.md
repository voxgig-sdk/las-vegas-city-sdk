# LasVegasCity Python SDK



The Python SDK for the LasVegasCity API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CityInfo()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/las-vegas-city-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from lasvegascity_sdk import LasVegasCitySDK

client = LasVegasCitySDK()
```

### 3. Load a cityinfo

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    cityinfo = client.CityInfo().load()
    print(cityinfo)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    councils = client.Council().list()
    print(councils)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = LasVegasCitySDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
council = client.Council().list()
# council contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = LasVegasCitySDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### LasVegasCitySDK

```python
from lasvegascity_sdk import LasVegasCitySDK

client = LasVegasCitySDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = LasVegasCitySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### LasVegasCitySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `city_info = client.CityInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` |  |
| `annualVisitors` | `float` |  |
| `established` | `int` |  |
| `name` | `str` |  |
| `numberOfParks` | `int` |  |
| `phone` | `str` |  |
| `squareMiles` | `float` |  |

#### Example: Load

```python
city_info = client.CityInfo().load()
```


### Council

Create an instance: `council = client.Council()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `str` |  |
| `email` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `phone` | `str` |  |
| `title` | `str` |  |
| `ward` | `str` |  |

#### Example: List

```python
councils = client.Council().list()
```


### Department

Create an instance: `department = client.Department()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contact` | `dict` |  |
| `description` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `services` | `list` |  |
| `url` | `str` |  |

#### Example: List

```python
departments = client.Department().list()
```


### EconomicDevelopment

Create an instance: `economic_development = client.EconomicDevelopment()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `industries` | `list` |  |
| `initiatives` | `list` |  |
| `resources` | `list` |  |

#### Example: List

```python
economic_developments = client.EconomicDevelopment().list()
```


### Event

Create an instance: `event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` |  |
| `description` | `str` |  |
| `endDate` | `str` |  |
| `id` | `str` |  |
| `isFree` | `bool` |  |
| `location` | `str` |  |
| `startDate` | `str` |  |
| `ticketUrl` | `str` |  |
| `title` | `str` |  |

#### Example: List

```python
events = client.Event().list()
```


### Job

Create an instance: `job = client.Job()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicationUrl` | `str` |  |
| `category` | `str` |  |
| `closeDate` | `str` |  |
| `department` | `str` |  |
| `description` | `str` |  |
| `id` | `str` |  |
| `postDate` | `str` |  |
| `requirements` | `list` |  |
| `salaryRange` | `dict` |  |
| `title` | `str` |  |

#### Example: List

```python
jobs = client.Job().list()
```


### Meeting

Create an instance: `meeting = client.Meeting()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agendaUrl` | `str` |  |
| `date` | `str` |  |
| `id` | `str` |  |
| `location` | `str` |  |
| `minutesUrl` | `str` |  |
| `status` | `str` |  |
| `title` | `str` |  |
| `type` | `str` |  |

#### Example: List

```python
meetings = client.Meeting().list()
```


### New

Create an instance: `new = client.New()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `str` |  |
| `category` | `str` |  |
| `content` | `str` |  |
| `id` | `str` |  |
| `publishDate` | `str` |  |
| `summary` | `str` |  |
| `title` | `str` |  |
| `url` | `str` |  |

#### Example: List

```python
news = client.New().list()
```


### Park

Create an instance: `park = client.Park()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` |  |
| `amenities` | `list` |  |
| `hours` | `dict` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `phone` | `str` |  |
| `type` | `str` |  |

#### Example: List

```python
parks = client.Park().list()
```


### Permit

Create an instance: `permit = client.Permit()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicationUrl` | `str` |  |
| `description` | `str` |  |
| `fee` | `float` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `processingTime` | `str` |  |
| `requirements` | `list` |  |
| `type` | `str` |  |

#### Example: List

```python
permits = client.Permit().list()
```


### PublicSafety

Create an instance: `public_safety = client.PublicSafety()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fire` | `dict` |  |
| `medical` | `dict` |  |
| `police` | `dict` |  |

#### Example: Load

```python
public_safety = client.PublicSafety().load()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── lasvegascity_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`lasvegascity_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
council = client.Council()
council.list()

# council.data_get() now returns the council data from the last list
# council.match_get() returns the last match criteria
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

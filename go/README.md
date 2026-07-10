# LasVegasCity Golang SDK



The Golang SDK for the LasVegasCity API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.CityInfo(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/las-vegas-city-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/las-vegas-city-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/las-vegas-city-sdk/go=../las-vegas-city-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/las-vegas-city-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single cityInfo — the value is the loaded record.
    cityInfo, err := client.CityInfo(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(cityInfo)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
cityinfo, err := client.CityInfo(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = cityinfo
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

cityInfo, err := client.CityInfo(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(cityInfo) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewLasVegasCitySDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewLasVegasCitySDK

```go
func NewLasVegasCitySDK(options map[string]any) *LasVegasCitySDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *LasVegasCitySDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LasVegasCitySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `CityInfo` | `(data map[string]any) LasVegasCityEntity` | Create a CityInfo entity instance. |
| `Council` | `(data map[string]any) LasVegasCityEntity` | Create a Council entity instance. |
| `Department` | `(data map[string]any) LasVegasCityEntity` | Create a Department entity instance. |
| `EconomicDevelopment` | `(data map[string]any) LasVegasCityEntity` | Create an EconomicDevelopment entity instance. |
| `Event` | `(data map[string]any) LasVegasCityEntity` | Create an Event entity instance. |
| `Job` | `(data map[string]any) LasVegasCityEntity` | Create a Job entity instance. |
| `Meeting` | `(data map[string]any) LasVegasCityEntity` | Create a Meeting entity instance. |
| `New` | `(data map[string]any) LasVegasCityEntity` | Create a New entity instance. |
| `Park` | `(data map[string]any) LasVegasCityEntity` | Create a Park entity instance. |
| `Permit` | `(data map[string]any) LasVegasCityEntity` | Create a Permit entity instance. |
| `PublicSafety` | `(data map[string]any) LasVegasCityEntity` | Create a PublicSafety entity instance. |

### Entity interface (LasVegasCityEntity)

All entities implement the `LasVegasCityEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    cityInfo, err := client.CityInfo(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // cityInfo is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### CityInfo

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"annual_visitor"` |  |
| `"established"` |  |
| `"name"` |  |
| `"number_of_park"` |  |
| `"phone"` |  |
| `"square_mile"` |  |

Operations: Load.

API path: `/city-info`

#### Council

| Field | Description |
| --- | --- |
| `"bio"` |  |
| `"email"` |  |
| `"id"` |  |
| `"name"` |  |
| `"phone"` |  |
| `"title"` |  |
| `"ward"` |  |

Operations: List.

API path: `/council`

#### Department

| Field | Description |
| --- | --- |
| `"contact"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"service"` |  |
| `"url"` |  |

Operations: List.

API path: `/departments`

#### EconomicDevelopment

| Field | Description |
| --- | --- |
| `"industry"` |  |
| `"initiatif"` |  |
| `"resource"` |  |

Operations: List.

API path: `/business/economic-development`

#### Event

| Field | Description |
| --- | --- |
| `"category"` |  |
| `"description"` |  |
| `"end_date"` |  |
| `"id"` |  |
| `"is_free"` |  |
| `"location"` |  |
| `"start_date"` |  |
| `"ticket_url"` |  |
| `"title"` |  |

Operations: List.

API path: `/events`

#### Job

| Field | Description |
| --- | --- |
| `"application_url"` |  |
| `"category"` |  |
| `"close_date"` |  |
| `"department"` |  |
| `"description"` |  |
| `"id"` |  |
| `"post_date"` |  |
| `"requirement"` |  |
| `"salary_range"` |  |
| `"title"` |  |

Operations: List.

API path: `/jobs`

#### Meeting

| Field | Description |
| --- | --- |
| `"agenda_url"` |  |
| `"date"` |  |
| `"id"` |  |
| `"location"` |  |
| `"minutes_url"` |  |
| `"status"` |  |
| `"title"` |  |
| `"type"` |  |

Operations: List.

API path: `/meetings`

#### New

| Field | Description |
| --- | --- |
| `"author"` |  |
| `"category"` |  |
| `"content"` |  |
| `"id"` |  |
| `"publish_date"` |  |
| `"summary"` |  |
| `"title"` |  |
| `"url"` |  |

Operations: List.

API path: `/news`

#### Park

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"amenity"` |  |
| `"hour"` |  |
| `"id"` |  |
| `"name"` |  |
| `"phone"` |  |
| `"type"` |  |

Operations: List.

API path: `/parks`

#### Permit

| Field | Description |
| --- | --- |
| `"application_url"` |  |
| `"description"` |  |
| `"fee"` |  |
| `"id"` |  |
| `"name"` |  |
| `"processing_time"` |  |
| `"requirement"` |  |
| `"type"` |  |

Operations: List.

API path: `/permits`

#### PublicSafety

| Field | Description |
| --- | --- |
| `"fire"` |  |
| `"medical"` |  |
| `"police"` |  |

Operations: Load.

API path: `/public-safety`



## Entities


### CityInfo

Create an instance: `cityInfo := client.CityInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `annual_visitor` | `float64` |  |
| `established` | `int` |  |
| `name` | `string` |  |
| `number_of_park` | `int` |  |
| `phone` | `string` |  |
| `square_mile` | `float64` |  |

#### Example: Load

```go
cityInfo, err := client.CityInfo(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cityInfo) // the loaded record
```


### Council

Create an instance: `council := client.Council(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
councils, err := client.Council(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(councils) // the array of records
```


### Department

Create an instance: `department := client.Department(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contact` | `map[string]any` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `service` | `[]any` |  |
| `url` | `string` |  |

#### Example: List

```go
departments, err := client.Department(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(departments) // the array of records
```


### EconomicDevelopment

Create an instance: `economicDevelopment := client.EconomicDevelopment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `industry` | `[]any` |  |
| `initiatif` | `[]any` |  |
| `resource` | `[]any` |  |

#### Example: List

```go
economicDevelopments, err := client.EconomicDevelopment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(economicDevelopments) // the array of records
```


### Event

Create an instance: `event := client.Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `description` | `string` |  |
| `end_date` | `string` |  |
| `id` | `string` |  |
| `is_free` | `bool` |  |
| `location` | `string` |  |
| `start_date` | `string` |  |
| `ticket_url` | `string` |  |
| `title` | `string` |  |

#### Example: List

```go
events, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(events) // the array of records
```


### Job

Create an instance: `job := client.Job(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_url` | `string` |  |
| `category` | `string` |  |
| `close_date` | `string` |  |
| `department` | `string` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `post_date` | `string` |  |
| `requirement` | `[]any` |  |
| `salary_range` | `map[string]any` |  |
| `title` | `string` |  |

#### Example: List

```go
jobs, err := client.Job(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(jobs) // the array of records
```


### Meeting

Create an instance: `meeting := client.Meeting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agenda_url` | `string` |  |
| `date` | `string` |  |
| `id` | `string` |  |
| `location` | `string` |  |
| `minutes_url` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |

#### Example: List

```go
meetings, err := client.Meeting(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(meetings) // the array of records
```


### New

Create an instance: `new := client.New(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` |  |
| `category` | `string` |  |
| `content` | `string` |  |
| `id` | `string` |  |
| `publish_date` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: List

```go
news, err := client.New(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(news) // the array of records
```


### Park

Create an instance: `park := client.Park(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `amenity` | `[]any` |  |
| `hour` | `map[string]any` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `phone` | `string` |  |
| `type` | `string` |  |

#### Example: List

```go
parks, err := client.Park(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(parks) // the array of records
```


### Permit

Create an instance: `permit := client.Permit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_url` | `string` |  |
| `description` | `string` |  |
| `fee` | `float64` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `processing_time` | `string` |  |
| `requirement` | `[]any` |  |
| `type` | `string` |  |

#### Example: List

```go
permits, err := client.Permit(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(permits) // the array of records
```


### PublicSafety

Create an instance: `publicSafety := client.PublicSafety(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fire` | `map[string]any` |  |
| `medical` | `map[string]any` |  |
| `police` | `map[string]any` |  |

#### Example: Load

```go
publicSafety, err := client.PublicSafety(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(publicSafety) // the loaded record
```


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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/las-vegas-city-sdk/go/
├── las-vegas-city.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/las-vegas-city-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
cityinfo := client.CityInfo(nil)
cityinfo.Load(nil, nil)

// cityinfo.Data() now returns the cityinfo data from the last load
// cityinfo.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

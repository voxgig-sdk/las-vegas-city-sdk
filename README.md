# LasVegasCity SDK

Access City of Las Vegas civic data covering departments, council, parks, permits, jobs, events, meetings and public safety

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Las Vegas City API

The Las Vegas City API surfaces civic data from the [City of Las Vegas, Nevada](https://www.lasvegasnevada.gov/) — the municipal government for Nevada's largest city. It is catalogued on [Free Public APIs](https://freepublicapis.com/las-vegas-city-api) as a community-tracked endpoint exposing information that residents, visitors, and businesses interact with day to day.

What you can expect from the data:

- City departments, council members and meeting agendas
- Parks, community events and recreation programs
- Jobs, permits and economic development resources
- Public safety information (fire, medical and law enforcement)
- General city news and announcements

The base server is `https://www.lasvegasnevada.gov/api`. Community monitoring reports roughly 97% uptime over a rolling 30 day window with average response times near 1.3 seconds and CORS disabled, so server-side calls are recommended. No authentication or rate-limit policy is publicly documented; be considerate when polling.

## Try it

**TypeScript**
```bash
npm install las-vegas-city
```

**Python**
```bash
pip install las-vegas-city-sdk
```

**PHP**
```bash
composer require voxgig/las-vegas-city-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/las-vegas-city-sdk/go
```

**Ruby**
```bash
gem install las-vegas-city-sdk
```

**Lua**
```bash
luarocks install las-vegas-city-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { LasVegasCitySDK } from 'las-vegas-city'

const client = new LasVegasCitySDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o las-vegas-city-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "las-vegas-city": {
      "command": "/abs/path/to/las-vegas-city-mcp"
    }
  }
}
```

## Entities

The API exposes 11 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **CityInfo** | General information about the City of Las Vegas — overview content describing the municipality and its services. | `/city-info` |
| **Council** | Las Vegas City Council resources covering the seven-member elected body and related governance data. | `/council` |
| **Department** | Listings and details for city departments that deliver municipal services. | `/departments` |
| **EconomicDevelopment** | Economic development programs and business support resources offered by the city. | `/business/economic-development` |
| **Event** | Community events, classes, performances and civic activities hosted or promoted by the city. | `/events` |
| **Job** | Open government job listings and career opportunities with the City of Las Vegas. | `/jobs` |
| **Meeting** | Public meetings and agendas, including City Council and board sessions surfaced via the city's meeting portal. | `/meetings` |
| **New** | City news items and announcements. | `/news` |
| **Park** | Parks, recreation facilities and community centers across the city's 130+ park locations. | `/parks` |
| **Permit** | Building permits, business licences and related application/status data. | `/permits` |
| **PublicSafety** | Public safety information covering fire, medical response and law enforcement services. | `/public-safety` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from lasvegascity_sdk import LasVegasCitySDK

client = LasVegasCitySDK({})


# Load a specific cityinfo
cityinfo, err = client.CityInfo(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'lasvegascity_sdk.php';

$client = new LasVegasCitySDK([]);


// Load a specific cityinfo
[$cityinfo, $err] = $client->CityInfo(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/las-vegas-city-sdk/go"

client := sdk.NewLasVegasCitySDK(map[string]any{})

```

### Ruby

```ruby
require_relative "LasVegasCity_sdk"

client = LasVegasCitySDK.new({})


# Load a specific cityinfo
cityinfo, err = client.CityInfo(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("las-vegas-city_sdk")

local client = sdk.new({})


-- Load a specific cityinfo
local cityinfo, err = client:CityInfo(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = LasVegasCitySDK.test()
const result = await client.CityInfo().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = LasVegasCitySDK.test(None, None)
result, err = client.CityInfo(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = LasVegasCitySDK::test(null, null);
[$result, $err] = $client->CityInfo(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.CityInfo(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = LasVegasCitySDK.test(nil, nil)
result, err = client.CityInfo(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:CityInfo(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Las Vegas City API

- Upstream: [https://www.lasvegasnevada.gov/](https://www.lasvegasnevada.gov/)
- API docs: [https://freepublicapis.com/las-vegas-city-api](https://freepublicapis.com/las-vegas-city-api)

- The City of Las Vegas does not publish explicit licence terms for this API.
- Content is sourced from the official municipal website at `lasvegasnevada.gov` and represents public civic information.
- Attribute the City of Las Vegas when redistributing data and verify any sensitive use against the source.
- No warranty is provided; data may change without notice.

---

Generated from the Las Vegas City API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

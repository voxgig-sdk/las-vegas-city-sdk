# LasVegasCity TypeScript SDK



The TypeScript SDK for the LasVegasCity API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.CityInfo()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/las-vegas-city-sdk/releases](https://github.com/voxgig-sdk/las-vegas-city-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { LasVegasCitySDK } from '@voxgig-sdk/las-vegas-city'

const client = new LasVegasCitySDK()
```

### 3. Load a cityinfo

`load()` returns the entity directly and throws on failure:

```ts
try {
  const cityinfo = await client.CityInfo().load()
  console.log(cityinfo)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const councils = await client.Council().list()
  console.log(councils)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = LasVegasCitySDK.test()

const council = await client.Council().list()
// council is the entity, populated with mock response data
// — call council.data() for the record itself
console.log(council)
```

You can also use the instance method:

```ts
const client = new LasVegasCitySDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Council()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new LasVegasCitySDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LAS_VEGAS_CITY_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### LasVegasCitySDK

#### Constructor

```ts
new LasVegasCitySDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `CityInfo(data?)` | `CityInfoEntity` | Create a CityInfo entity instance. |
| `Council(data?)` | `CouncilEntity` | Create a Council entity instance. |
| `Department(data?)` | `DepartmentEntity` | Create a Department entity instance. |
| `EconomicDevelopment(data?)` | `EconomicDevelopmentEntity` | Create an EconomicDevelopment entity instance. |
| `Event(data?)` | `EventEntity` | Create an Event entity instance. |
| `Job(data?)` | `JobEntity` | Create a Job entity instance. |
| `Meeting(data?)` | `MeetingEntity` | Create a Meeting entity instance. |
| `New(data?)` | `NewEntity` | Create a New entity instance. |
| `Park(data?)` | `ParkEntity` | Create a Park entity instance. |
| `Permit(data?)` | `PermitEntity` | Create a Permit entity instance. |
| `PublicSafety(data?)` | `PublicSafetyEntity` | Create a PublicSafety entity instance. |
| `tester(testopts?, sdkopts?)` | `LasVegasCitySDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `LasVegasCitySDK.test(testopts?, sdkopts?)` | `LasVegasCitySDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): LasVegasCitySDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: load.

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

Operations: list.

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

Operations: list.

API path: `/departments`

#### EconomicDevelopment

| Field | Description |
| --- | --- |
| `industries` |  |
| `initiatives` |  |
| `resources` |  |

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

API path: `/permits`

#### PublicSafety

| Field | Description |
| --- | --- |
| `fire` |  |
| `medical` |  |
| `police` |  |

Operations: load.

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
| `address` | `string` |  |
| `annualVisitors` | `number` |  |
| `established` | `number` |  |
| `name` | `string` |  |
| `numberOfParks` | `number` |  |
| `phone` | `string` |  |
| `squareMiles` | `number` |  |

#### Example: Load

```ts
const city_info = await client.CityInfo().load()
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
| `bio` | `string` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `phone` | `string` |  |
| `title` | `string` |  |
| `ward` | `string` |  |

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
| `contact` | `Record<string, any>` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `services` | `any[]` |  |
| `url` | `string` |  |

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
| `industries` | `any[]` |  |
| `initiatives` | `any[]` |  |
| `resources` | `any[]` |  |

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
| `applicationUrl` | `string` |  |
| `category` | `string` |  |
| `closeDate` | `string` |  |
| `department` | `string` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `postDate` | `string` |  |
| `requirements` | `any[]` |  |
| `salaryRange` | `Record<string, any>` |  |
| `title` | `string` |  |

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
| `agendaUrl` | `string` |  |
| `date` | `string` |  |
| `id` | `string` |  |
| `location` | `string` |  |
| `minutesUrl` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |

#### Example: List

```ts
const meetings = await client.Meeting().list()
```


### New

Create an instance: `const new_ = client.New()`

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

```ts
const new_s = await client.New().list()
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
| `address` | `string` |  |
| `amenities` | `any[]` |  |
| `hours` | `Record<string, any>` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `phone` | `string` |  |
| `type` | `string` |  |

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
| `applicationUrl` | `string` |  |
| `description` | `string` |  |
| `fee` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `processingTime` | `string` |  |
| `requirements` | `any[]` |  |
| `type` | `string` |  |

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
| `fire` | `Record<string, any>` |  |
| `medical` | `Record<string, any>` |  |
| `police` | `Record<string, any>` |  |

#### Example: Load

```ts
const public_safety = await client.PublicSafety().load()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
las-vegas-city/
├── src/
│   ├── LasVegasCitySDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { LasVegasCitySDK } from '@voxgig-sdk/las-vegas-city'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const council = client.Council()
await council.list()

// council.data() now returns the council data from the last `list`
// council.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

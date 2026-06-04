# LasVegasCity TypeScript SDK

The TypeScript SDK for the LasVegasCity API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install las-vegas-city
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { LasVegasCitySDK } from 'las-vegas-city'

const client = new LasVegasCitySDK({})
```

### 3. Load a cityinfo

```ts
const result = await client.CityInfo().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
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

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new LasVegasCitySDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
LAS-VEGAS-CITY_TEST_LIVE=TRUE
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
| `EconomicDevelopment(data?)` | `EconomicDevelopmentEntity` | Create a EconomicDevelopment entity instance. |
| `Event(data?)` | `EventEntity` | Create a Event entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): LasVegasCitySDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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
| `annual_visitor` |  |
| `established` |  |
| `name` |  |
| `number_of_park` |  |
| `phone` |  |
| `square_mile` |  |

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
| `service` |  |
| `url` |  |

Operations: list.

API path: `/departments`

#### EconomicDevelopment

| Field | Description |
| --- | --- |
| `industry` |  |
| `initiatif` |  |
| `resource` |  |

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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
import { LasVegasCitySDK } from 'las-vegas-city'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
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

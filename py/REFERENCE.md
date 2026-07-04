# LasVegasCity Python SDK Reference

Complete API reference for the LasVegasCity Python SDK.


## LasVegasCitySDK

### Constructor

```python
from las-vegas-city_sdk import LasVegasCitySDK

client = LasVegasCitySDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LasVegasCitySDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = LasVegasCitySDK.test()
```


### Instance Methods

#### `CityInfo(data=None)`

Create a new `CityInfoEntity` instance. Pass `None` for no initial data.

#### `Council(data=None)`

Create a new `CouncilEntity` instance. Pass `None` for no initial data.

#### `Department(data=None)`

Create a new `DepartmentEntity` instance. Pass `None` for no initial data.

#### `EconomicDevelopment(data=None)`

Create a new `EconomicDevelopmentEntity` instance. Pass `None` for no initial data.

#### `Event(data=None)`

Create a new `EventEntity` instance. Pass `None` for no initial data.

#### `Job(data=None)`

Create a new `JobEntity` instance. Pass `None` for no initial data.

#### `Meeting(data=None)`

Create a new `MeetingEntity` instance. Pass `None` for no initial data.

#### `New(data=None)`

Create a new `NewEntity` instance. Pass `None` for no initial data.

#### `Park(data=None)`

Create a new `ParkEntity` instance. Pass `None` for no initial data.

#### `Permit(data=None)`

Create a new `PermitEntity` instance. Pass `None` for no initial data.

#### `PublicSafety(data=None)`

Create a new `PublicSafetyEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CityInfoEntity

```python
city_info = client.CityInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$STRING`` | No |  |
| `annual_visitor` | ``$NUMBER`` | No |  |
| `established` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `number_of_park` | ``$INTEGER`` | No |  |
| `phone` | ``$STRING`` | No |  |
| `square_mile` | ``$NUMBER`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CityInfo().load({"id": "city_info_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CityInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CouncilEntity

```python
council = client.Council()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `phone` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `ward` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Council().list({})
for council in results:
    print(council)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CouncilEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DepartmentEntity

```python
department = client.Department()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `service` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Department().list({})
for department in results:
    print(department)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DepartmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EconomicDevelopmentEntity

```python
economic_development = client.EconomicDevelopment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `industry` | ``$ARRAY`` | No |  |
| `initiatif` | ``$ARRAY`` | No |  |
| `resource` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.EconomicDevelopment().list({})
for economic_development in results:
    print(economic_development)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EconomicDevelopmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventEntity

```python
event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `end_date` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `is_free` | ``$BOOLEAN`` | No |  |
| `location` | ``$STRING`` | No |  |
| `start_date` | ``$STRING`` | No |  |
| `ticket_url` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Event().list({})
for event in results:
    print(event)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JobEntity

```python
job = client.Job()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_url` | ``$STRING`` | No |  |
| `category` | ``$STRING`` | No |  |
| `close_date` | ``$STRING`` | No |  |
| `department` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `post_date` | ``$STRING`` | No |  |
| `requirement` | ``$ARRAY`` | No |  |
| `salary_range` | ``$OBJECT`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Job().list({})
for job in results:
    print(job)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JobEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeetingEntity

```python
meeting = client.Meeting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda_url` | ``$STRING`` | No |  |
| `date` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `location` | ``$STRING`` | No |  |
| `minutes_url` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Meeting().list({})
for meeting in results:
    print(meeting)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NewEntity

```python
new = client.New()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | ``$STRING`` | No |  |
| `category` | ``$STRING`` | No |  |
| `content` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `publish_date` | ``$STRING`` | No |  |
| `summary` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.New().list({})
for new in results:
    print(new)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ParkEntity

```python
park = client.Park()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$STRING`` | No |  |
| `amenity` | ``$ARRAY`` | No |  |
| `hour` | ``$OBJECT`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `phone` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Park().list({})
for park in results:
    print(park)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ParkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PermitEntity

```python
permit = client.Permit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_url` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `fee` | ``$NUMBER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `processing_time` | ``$STRING`` | No |  |
| `requirement` | ``$ARRAY`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Permit().list({})
for permit in results:
    print(permit)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PermitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicSafetyEntity

```python
public_safety = client.PublicSafety()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fire` | ``$OBJECT`` | No |  |
| `medical` | ``$OBJECT`` | No |  |
| `police` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PublicSafety().load({"id": "public_safety_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicSafetyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = LasVegasCitySDK({
    "feature": {
        "test": {"active": True},
    },
})
```


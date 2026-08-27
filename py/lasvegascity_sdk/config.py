# LasVegasCity SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "LasVegasCity",
            "slug": "las-vegas-city",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://www.lasvegasnevada.gov/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "city_info": {},
                "council": {},
                "department": {},
                "economic_development": {},
                "event": {},
                "job": {},
                "meeting": {},
                "new": {},
                "park": {},
                "permit": {},
                "public_safety": {},
            },
        },
        "entity": {
      "city_info": {
        "fields": [
          {
            "name": "address",
            "type": "`$STRING`",
          },
          {
            "name": "annualVisitors",
            "type": "`$NUMBER`",
          },
          {
            "name": "established",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "numberOfParks",
            "type": "`$INTEGER`",
          },
          {
            "name": "phone",
            "type": "`$STRING`",
          },
          {
            "name": "squareMiles",
            "type": "`$NUMBER`",
          },
        ],
        "name": "city_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/city-info",
                "parts": [
                  "city-info",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "council": {
        "fields": [
          {
            "name": "bio",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "ward",
            "type": "`$STRING`",
          },
        ],
        "name": "council",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/council",
                "parts": [
                  "council",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "department": {
        "fields": [
          {
            "name": "contact",
            "type": "`$OBJECT`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "services",
            "type": "`$ARRAY`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "department",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/departments",
                "parts": [
                  "departments",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "economic_development": {
        "fields": [
          {
            "name": "industries",
            "type": "`$ARRAY`",
          },
          {
            "name": "initiatives",
            "type": "`$ARRAY`",
          },
          {
            "name": "resources",
            "type": "`$ARRAY`",
          },
        ],
        "name": "economic_development",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/business/economic-development",
                "parts": [
                  "business",
                  "economic-development",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "event": {
        "fields": [
          {
            "name": "category",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "endDate",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "isFree",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "startDate",
            "type": "`$STRING`",
          },
          {
            "name": "ticketUrl",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
        ],
        "name": "event",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/events",
                "parts": [
                  "events",
                ],
                "select": {
                  "exist": [
                    "category",
                    "end_date",
                    "start_date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "job": {
        "fields": [
          {
            "name": "applicationUrl",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "type": "`$STRING`",
          },
          {
            "name": "closeDate",
            "type": "`$STRING`",
          },
          {
            "name": "department",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "postDate",
            "type": "`$STRING`",
          },
          {
            "name": "requirements",
            "type": "`$ARRAY`",
          },
          {
            "name": "salaryRange",
            "type": "`$OBJECT`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
        ],
        "name": "job",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "department",
                      "orig": "department",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/jobs",
                "parts": [
                  "jobs",
                ],
                "select": {
                  "exist": [
                    "category",
                    "department",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "meeting": {
        "fields": [
          {
            "name": "agendaUrl",
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "minutesUrl",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
        "name": "meeting",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/meetings",
                "parts": [
                  "meetings",
                ],
                "select": {
                  "exist": [
                    "start_date",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "new": {
        "fields": [
          {
            "name": "author",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "type": "`$STRING`",
          },
          {
            "name": "content",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "publishDate",
            "type": "`$STRING`",
          },
          {
            "name": "summary",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "new",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/news",
                "parts": [
                  "news",
                ],
                "select": {
                  "exist": [
                    "category",
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "park": {
        "fields": [
          {
            "name": "address",
            "type": "`$STRING`",
          },
          {
            "name": "amenities",
            "type": "`$ARRAY`",
          },
          {
            "name": "hours",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
        "name": "park",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "amenity",
                      "orig": "amenity",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/parks",
                "parts": [
                  "parks",
                ],
                "select": {
                  "exist": [
                    "amenity",
                    "location",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "permit": {
        "fields": [
          {
            "name": "applicationUrl",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "fee",
            "type": "`$NUMBER`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "processingTime",
            "type": "`$STRING`",
          },
          {
            "name": "requirements",
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
        "name": "permit",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/permits",
                "parts": [
                  "permits",
                ],
                "select": {
                  "exist": [
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "public_safety": {
        "fields": [
          {
            "name": "fire",
            "type": "`$OBJECT`",
          },
          {
            "name": "medical",
            "type": "`$OBJECT`",
          },
          {
            "name": "police",
            "type": "`$OBJECT`",
          },
        ],
        "name": "public_safety",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/public-safety",
                "parts": [
                  "public-safety",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

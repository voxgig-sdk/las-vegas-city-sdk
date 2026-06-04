
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://www.lasvegasnevada.gov/api',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      city_info: {
      },

      council: {
      },

      department: {
      },

      economic_development: {
      },

      event: {
      },

      job: {
      },

      meeting: {
      },

      new: {
      },

      park: {
      },

      permit: {
      },

      public_safety: {
      },

    }
  }


  entity = {
    "city_info": {
      "fields": [
        {
          "name": "address",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "annual_visitor",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "established",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "number_of_park",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 4
        },
        {
          "name": "phone",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "square_mile",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 6
        }
      ],
      "name": "city_info",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "method": "GET",
              "orig": "/city-info",
              "parts": [
                "city-info"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "council": {
      "fields": [
        {
          "name": "bio",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "email",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "phone",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "ward",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        }
      ],
      "name": "council",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/council",
              "parts": [
                "council"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "department": {
      "fields": [
        {
          "name": "contact",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "service",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 4
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        }
      ],
      "name": "department",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/departments",
              "parts": [
                "departments"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "economic_development": {
      "fields": [
        {
          "name": "industry",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "initiatif",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "resource",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "economic_development",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/business/economic-development",
              "parts": [
                "business",
                "economic-development"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "event": {
      "fields": [
        {
          "name": "category",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "end_date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "is_free",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 4
        },
        {
          "name": "location",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "start_date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "ticket_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        }
      ],
      "name": "event",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/events",
              "parts": [
                "events"
              ],
              "select": {
                "exist": [
                  "category",
                  "end_date",
                  "start_date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "job": {
      "fields": [
        {
          "name": "application_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "category",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "close_date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "department",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "post_date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "requirement",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 7
        },
        {
          "name": "salary_range",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 8
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        }
      ],
      "name": "job",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "department",
                    "orig": "department",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/jobs",
              "parts": [
                "jobs"
              ],
              "select": {
                "exist": [
                  "category",
                  "department"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "meeting": {
      "fields": [
        {
          "name": "agenda_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "location",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "minutes_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        }
      ],
      "name": "meeting",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/meetings",
              "parts": [
                "meetings"
              ],
              "select": {
                "exist": [
                  "start_date",
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "new": {
      "fields": [
        {
          "name": "author",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "category",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "content",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "publish_date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "summary",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        }
      ],
      "name": "new",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/news",
              "parts": [
                "news"
              ],
              "select": {
                "exist": [
                  "category",
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "park": {
      "fields": [
        {
          "name": "address",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "amenity",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "hour",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "phone",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        }
      ],
      "name": "park",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "amenity",
                    "orig": "amenity",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "location",
                    "orig": "location",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/parks",
              "parts": [
                "parks"
              ],
              "select": {
                "exist": [
                  "amenity",
                  "location"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "permit": {
      "fields": [
        {
          "name": "application_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "fee",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "processing_time",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "requirement",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 6
        },
        {
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        }
      ],
      "name": "permit",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/permits",
              "parts": [
                "permits"
              ],
              "select": {
                "exist": [
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "public_safety": {
      "fields": [
        {
          "name": "fire",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "medical",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 1
        },
        {
          "name": "police",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "public_safety",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "method": "GET",
              "orig": "/public-safety",
              "parts": [
                "public-safety"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}


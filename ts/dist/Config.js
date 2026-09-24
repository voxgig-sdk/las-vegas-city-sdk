"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'LasVegasCity',
        slug: "las-vegas-city",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://www.lasvegasnevada.gov/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            city_info: {},
            council: {},
            department: {},
            economic_development: {},
            event: {},
            job: {},
            meeting: {},
            new: {},
            park: {},
            permit: {},
            public_safety: {},
        }
    };
    entity = {
        "city_info": {
            "fields": [
                {
                    "name": "address",
                    "title": "Address",
                    "type": "`$STRING`"
                },
                {
                    "name": "annualVisitors",
                    "title": "Annual Visitors",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "established",
                    "title": "Established",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "numberOfParks",
                    "title": "Number Of Parks",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "phone",
                    "title": "Phone",
                    "type": "`$STRING`"
                },
                {
                    "name": "squareMiles",
                    "title": "Square Miles",
                    "type": "`$NUMBER`"
                }
            ],
            "name": "city_info",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/city-info",
                            "segments": [
                                {
                                    "lit": "city-info"
                                }
                            ],
                            "parts": [
                                "city-info"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                    "title": "Bio",
                    "type": "`$STRING`"
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "format": "email"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "phone",
                    "title": "Phone",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`"
                },
                {
                    "name": "ward",
                    "title": "Ward",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "council",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/council",
                            "segments": [
                                {
                                    "lit": "council"
                                }
                            ],
                            "parts": [
                                "council"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                    "title": "Contact",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "services",
                    "title": "Services",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "department",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/departments",
                            "segments": [
                                {
                                    "lit": "departments"
                                }
                            ],
                            "parts": [
                                "departments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "economic_development": {
            "fields": [
                {
                    "name": "industries",
                    "title": "Industries",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "initiatives",
                    "title": "Initiatives",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "resources",
                    "title": "Resources",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "economic_development",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/business/economic-development",
                            "segments": [
                                {
                                    "lit": "business"
                                },
                                {
                                    "lit": "economic-development"
                                }
                            ],
                            "parts": [
                                "business",
                                "economic-development"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                    "title": "Category",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "endDate",
                    "title": "End Date",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "isFree",
                    "title": "Is Free",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "location",
                    "title": "Location",
                    "type": "`$STRING`"
                },
                {
                    "name": "startDate",
                    "title": "Start Date",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "ticketUrl",
                    "title": "Ticket Url",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "event",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/events",
                            "segments": [
                                {
                                    "lit": "events"
                                }
                            ],
                            "parts": [
                                "events"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "category",
                                    "end_date",
                                    "start_date"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "job": {
            "fields": [
                {
                    "name": "applicationUrl",
                    "title": "Application Url",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "category",
                    "title": "Category",
                    "type": "`$STRING`"
                },
                {
                    "name": "closeDate",
                    "title": "Close Date",
                    "type": "`$STRING`",
                    "format": "date"
                },
                {
                    "name": "department",
                    "title": "Department",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "postDate",
                    "title": "Post Date",
                    "type": "`$STRING`",
                    "format": "date"
                },
                {
                    "name": "requirements",
                    "title": "Requirements",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "salaryRange",
                    "title": "Salary Range",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "job",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/jobs",
                            "segments": [
                                {
                                    "lit": "jobs"
                                }
                            ],
                            "parts": [
                                "jobs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "department",
                                        "orig": "department",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "category",
                                    "department"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "meeting": {
            "fields": [
                {
                    "name": "agendaUrl",
                    "title": "Agenda Url",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "date",
                    "title": "Date",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "location",
                    "title": "Location",
                    "type": "`$STRING`"
                },
                {
                    "name": "minutesUrl",
                    "title": "Minutes Url",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "meeting",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/meetings",
                            "segments": [
                                {
                                    "lit": "meetings"
                                }
                            ],
                            "parts": [
                                "meetings"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "start_date",
                                    "type"
                                ]
                            }
                        }
                    ]
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
                    "title": "Author",
                    "type": "`$STRING`"
                },
                {
                    "name": "category",
                    "title": "Category",
                    "type": "`$STRING`"
                },
                {
                    "name": "content",
                    "title": "Content",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "publishDate",
                    "title": "Publish Date",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "summary",
                    "title": "Summary",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "new",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/news",
                            "segments": [
                                {
                                    "lit": "news"
                                }
                            ],
                            "parts": [
                                "news"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "category",
                                    "limit"
                                ]
                            }
                        }
                    ]
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
                    "title": "Address",
                    "type": "`$STRING`"
                },
                {
                    "name": "amenities",
                    "title": "Amenities",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "hours",
                    "title": "Hours",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "phone",
                    "title": "Phone",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "park",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/parks",
                            "segments": [
                                {
                                    "lit": "parks"
                                }
                            ],
                            "parts": [
                                "parks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "amenity",
                                        "orig": "amenity",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "location",
                                        "orig": "location",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "amenity",
                                    "location"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "permit": {
            "fields": [
                {
                    "name": "applicationUrl",
                    "title": "Application Url",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "fee",
                    "title": "Fee",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "processingTime",
                    "title": "Processing Time",
                    "type": "`$STRING`"
                },
                {
                    "name": "requirements",
                    "title": "Requirements",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "permit",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/permits",
                            "segments": [
                                {
                                    "lit": "permits"
                                }
                            ],
                            "parts": [
                                "permits"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "type"
                                ]
                            }
                        }
                    ]
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
                    "title": "Fire",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "medical",
                    "title": "Medical",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "police",
                    "title": "Police",
                    "type": "`$OBJECT`"
                }
            ],
            "name": "public_safety",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/public-safety",
                            "segments": [
                                {
                                    "lit": "public-safety"
                                }
                            ],
                            "parts": [
                                "public-safety"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map
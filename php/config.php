<?php
declare(strict_types=1);

// LasVegasCity SDK configuration

class LasVegasCityConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "LasVegasCity",
                "slug" => "las-vegas-city",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://www.lasvegasnevada.gov/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "city_info" => [],
                    "council" => [],
                    "department" => [],
                    "economic_development" => [],
                    "event" => [],
                    "job" => [],
                    "meeting" => [],
                    "new" => [],
                    "park" => [],
                    "permit" => [],
                    "public_safety" => [],
                ],
            ],
            "entity" => [
        'city_info' => [
          'fields' => [
            [
              'name' => 'address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'annualVisitors',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'established',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'numberOfParks',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'phone',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'squareMiles',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'city_info',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/city-info',
                  'segments' => [
                    [
                      'lit' => 'city-info',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'city-info',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'council' => [
          'fields' => [
            [
              'name' => 'bio',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'email',
              'name' => 'email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phone',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ward',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'council',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/council',
                  'segments' => [
                    [
                      'lit' => 'council',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'council',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'department' => [
          'fields' => [
            [
              'name' => 'contact',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'services',
              'type' => '`$ARRAY`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'department',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/departments',
                  'segments' => [
                    [
                      'lit' => 'departments',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'departments',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'economic_development' => [
          'fields' => [
            [
              'name' => 'industries',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'initiatives',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'resources',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'economic_development',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/business/economic-development',
                  'segments' => [
                    [
                      'lit' => 'business',
                    ],
                    [
                      'lit' => 'economic-development',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'business',
                    'economic-development',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'event' => [
          'fields' => [
            [
              'name' => 'category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'endDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isFree',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'location',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'startDate',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'ticketUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'event',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/events',
                  'segments' => [
                    [
                      'lit' => 'events',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'end_date',
                      'start_date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'events',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'job' => [
          'fields' => [
            [
              'format' => 'uri',
              'name' => 'applicationUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date',
              'name' => 'closeDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'department',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date',
              'name' => 'postDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'requirements',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'salaryRange',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'job',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'department',
                        'orig' => 'department',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/jobs',
                  'segments' => [
                    [
                      'lit' => 'jobs',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'department',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'jobs',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'meeting' => [
          'fields' => [
            [
              'format' => 'uri',
              'name' => 'agendaUrl',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'location',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'minutesUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'meeting',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/meetings',
                  'segments' => [
                    [
                      'lit' => 'meetings',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'start_date',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'meetings',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'new' => [
          'fields' => [
            [
              'name' => 'author',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'content',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'publishDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'summary',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'new',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/news',
                  'segments' => [
                    [
                      'lit' => 'news',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'limit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'news',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'park' => [
          'fields' => [
            [
              'name' => 'address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'amenities',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'hours',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phone',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'park',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'amenity',
                        'orig' => 'amenity',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/parks',
                  'segments' => [
                    [
                      'lit' => 'parks',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'amenity',
                      'location',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'parks',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'permit' => [
          'fields' => [
            [
              'format' => 'uri',
              'name' => 'applicationUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fee',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'processingTime',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'requirements',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'type',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'permit',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/permits',
                  'segments' => [
                    [
                      'lit' => 'permits',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'permits',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'public_safety' => [
          'fields' => [
            [
              'name' => 'fire',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'medical',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'police',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'public_safety',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public-safety',
                  'segments' => [
                    [
                      'lit' => 'public-safety',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'public-safety',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return LasVegasCityFeatures::make_feature($name);
    }
}

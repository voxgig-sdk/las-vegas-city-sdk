

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LasVegasCitySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CityInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAS_VEGAS_CITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAS_VEGAS_CITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LasVegasCitySDK.test()
    const ent = testsdk.CityInfo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAS_VEGAS_CITY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'city_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"t":"`$STRING`","key$":"address","index$":0},"annualVisitors":{"a":true,"h":"Annual Visitors","n":"annualVisitors","r":false,"t":"`$NUMBER`","key$":"annualVisitors","index$":1},"established":{"a":true,"h":"Established","n":"established","r":false,"t":"`$INTEGER`","key$":"established","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":3},"numberOfParks":{"a":true,"h":"Number Of Parks","n":"numberOfParks","r":false,"t":"`$INTEGER`","key$":"numberOfParks","index$":4},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"t":"`$STRING`","key$":"phone","index$":5},"squareMiles":{"a":true,"h":"Square Miles","n":"squareMiles","r":false,"t":"`$NUMBER`","key$":"squareMiles","index$":6}},"name":"city_info","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /city-info","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/city-info","q":{},"r":{},"s":[{"lit":"city-info"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"city_info","name__orig":"city_info","Name":"CityInfo","name_":"city_info","name-":"city-info","NAME":"CITY_INFO","index$":0}, {"active":true,"entity":"city_info","key$":"BasicCityInfoFlow","kind":"basic","name":"BasicCityInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"city_info_ref01","srcdatavar":"city_info_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-city_info_ref01"}}],"index$":0}]}, 'CityInfo', {"GET /city-info":{"protocol":"http","operationId":"getCityInfo","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"name":{"example":"City of Las Vegas","key$":"name","type":"string"},"established":{"example":1905,"key$":"established","type":"integer"},"squareMiles":{"example":142,"key$":"squareMiles","type":"number"},"annualVisitors":{"example":41700000,"key$":"annualVisitors","type":"number"},"numberOfParks":{"example":130,"key$":"numberOfParks","type":"integer"},"address":{"example":"495 S. Main St. Las Vegas, NV 89101","key$":"address","type":"string"},"phone":{"example":"(702) 229-6011","key$":"phone","type":"string"}},"x-ref":"#/components/schemas/CityInfo","index$":0}}}},"400":{"description":"Bad request"},"500":{"description":"Internal server error"}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let city_info_ref01_data = Object.values(setup.data.existing.city_info)[0] as any

    // LOAD
    const city_info_ref01_ent = client.CityInfo()
    const city_info_ref01_match_dt0: any = {}
    const city_info_ref01_data_dt0 = (await city_info_ref01_ent.load(city_info_ref01_match_dt0)).data()
    assert(null != city_info_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/city_info/CityInfoTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LasVegasCitySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['city_info01','city_info02','city_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAS_VEGAS_CITY_TEST_CITY_INFO_ENTID': idmap,
    'LAS_VEGAS_CITY_TEST_LIVE': 'FALSE',
    'LAS_VEGAS_CITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAS_VEGAS_CITY_TEST_CITY_INFO_ENTID']

  const live = 'TRUE' === env.LAS_VEGAS_CITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAS_VEGAS_CITY_TEST_CITY_INFO_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LasVegasCitySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LAS_VEGAS_CITY_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  

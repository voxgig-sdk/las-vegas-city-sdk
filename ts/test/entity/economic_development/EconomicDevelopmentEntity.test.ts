

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


describe('EconomicDevelopmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAS_VEGAS_CITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAS_VEGAS_CITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LasVegasCitySDK.test()
    const ent = testsdk.EconomicDevelopment()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAS_VEGAS_CITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'economic_development.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"industries":{"a":true,"h":"Industries","n":"industries","r":false,"t":"`$ARRAY`","key$":"industries","index$":0},"initiatives":{"a":true,"h":"Initiatives","n":"initiatives","r":false,"t":"`$ARRAY`","key$":"initiatives","index$":1},"resources":{"a":true,"h":"Resources","n":"resources","r":false,"t":"`$ARRAY`","key$":"resources","index$":2}},"name":"economic_development","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /business/economic-development","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/business/economic-development","q":{},"r":{},"s":[{"lit":"business"},{"lit":"economic-development"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"economic_development","name__orig":"economic_development","Name":"EconomicDevelopment","name_":"economic_development","name-":"economic-development","NAME":"ECONOMIC_DEVELOPMENT","index$":3}, {"active":true,"entity":"economic_development","key$":"BasicEconomicDevelopmentFlow","kind":"basic","name":"BasicEconomicDevelopmentFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"economic_development_ref01"}}],"index$":0}]}, 'EconomicDevelopment', {"GET /business/economic-development":{"protocol":"http","operationId":"getEconomicDevelopment","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"initiatives":{"items":{"properties":{"benefits":{"items":{"type":"string"},"type":"array"},"description":{"type":"string"},"name":{"type":"string"}},"type":"object"},"key$":"initiatives","type":"array"},"industries":{"items":{"type":"string"},"key$":"industries","type":"array"},"resources":{"items":{"properties":{"description":{"type":"string"},"title":{"type":"string"},"url":{"format":"uri","type":"string"}},"type":"object"},"key$":"resources","type":"array"}},"x-ref":"#/components/schemas/EconomicDevelopment","index$":0}}}},"400":{"description":"Bad request"},"500":{"description":"Internal server error"}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let economic_development_ref01_data = Object.values(setup.data.existing.economic_development)[0] as any

    // LIST
    const economic_development_ref01_ent = client.EconomicDevelopment()
    const economic_development_ref01_match: any = {}

    const economic_development_ref01_list = (await economic_development_ref01_ent.list(economic_development_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/economic_development/EconomicDevelopmentTestData.json')

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
    ['economic_development01','economic_development02','economic_development03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAS_VEGAS_CITY_TEST_ECONOMIC_DEVELOPMENT_ENTID': idmap,
    'LAS_VEGAS_CITY_TEST_LIVE': 'FALSE',
    'LAS_VEGAS_CITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAS_VEGAS_CITY_TEST_ECONOMIC_DEVELOPMENT_ENTID']

  const live = 'TRUE' === env.LAS_VEGAS_CITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAS_VEGAS_CITY_TEST_ECONOMIC_DEVELOPMENT_ENTID']
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
  

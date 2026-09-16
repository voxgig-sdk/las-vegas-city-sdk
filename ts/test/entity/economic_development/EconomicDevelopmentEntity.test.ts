

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"industries","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"initiatives","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"resources","req":false,"type":"`$ARRAY`","index$":2}],"name":"economic_development","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /business/economic-development","json":"{\"operationId\":\"getEconomicDevelopment\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"industries\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"initiatives\":{\"items\":{\"properties\":{\"benefits\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"resources\":{\"items\":{\"properties\":{\"description\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/business/economic-development","segments":[{"lit":"business"},{"lit":"economic-development"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"economic_development","name__orig":"economic_development","Name":"EconomicDevelopment","name_":"economic_development","name-":"economic-development","NAME":"ECONOMIC_DEVELOPMENT","index$":3}, {"active":true,"entity":"economic_development","key$":"BasicEconomicDevelopmentFlow","kind":"basic","name":"BasicEconomicDevelopmentFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"economic_development_ref01"}}],"index$":0}]}, 'EconomicDevelopment')
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
  

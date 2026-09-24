

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


describe('PublicSafetyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAS_VEGAS_CITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAS_VEGAS_CITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LasVegasCitySDK.test()
    const ent = testsdk.PublicSafety()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAS_VEGAS_CITY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'public_safety.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"fire":{"a":true,"h":"Fire","n":"fire","r":false,"t":"`$OBJECT`","key$":"fire","index$":0},"medical":{"a":true,"h":"Medical","n":"medical","r":false,"t":"`$OBJECT`","key$":"medical","index$":1},"police":{"a":true,"h":"Police","n":"police","r":false,"t":"`$OBJECT`","key$":"police","index$":2}},"name":"public_safety","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /public-safety","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/public-safety","q":{},"r":{},"s":[{"lit":"public-safety"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"public_safety","name__orig":"public_safety","Name":"PublicSafety","name_":"public_safety","name-":"public-safety","NAME":"PUBLIC_SAFETY","index$":10}, {"active":true,"entity":"public_safety","key$":"BasicPublicSafetyFlow","kind":"basic","name":"BasicPublicSafetyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"public_safety_ref01","srcdatavar":"public_safety_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-public_safety_ref01"}}],"index$":0}]}, 'PublicSafety', {"GET /public-safety":{"protocol":"http","operationId":"getPublicSafety","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"fire":{"key$":"fire","properties":{"emergencyNumber":{"type":"string"},"nonEmergencyNumber":{"type":"string"},"services":{"items":{"type":"string"},"type":"array"}},"type":"object"},"police":{"key$":"police","properties":{"emergencyNumber":{"type":"string"},"nonEmergencyNumber":{"type":"string"},"services":{"items":{"type":"string"},"type":"array"}},"type":"object"},"medical":{"key$":"medical","properties":{"emergencyNumber":{"type":"string"},"services":{"items":{"type":"string"},"type":"array"}},"type":"object"}},"x-ref":"#/components/schemas/PublicSafety","index$":0}}}},"400":{"description":"Bad request"},"500":{"description":"Internal server error"}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let public_safety_ref01_data = Object.values(setup.data.existing.public_safety)[0] as any

    // LOAD
    const public_safety_ref01_ent = client.PublicSafety()
    const public_safety_ref01_match_dt0: any = {}
    const public_safety_ref01_data_dt0 = (await public_safety_ref01_ent.load(public_safety_ref01_match_dt0)).data()
    assert(null != public_safety_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/public_safety/PublicSafetyTestData.json')

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
    ['public_safety01','public_safety02','public_safety03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAS_VEGAS_CITY_TEST_PUBLIC_SAFETY_ENTID': idmap,
    'LAS_VEGAS_CITY_TEST_LIVE': 'FALSE',
    'LAS_VEGAS_CITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAS_VEGAS_CITY_TEST_PUBLIC_SAFETY_ENTID']

  const live = 'TRUE' === env.LAS_VEGAS_CITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAS_VEGAS_CITY_TEST_PUBLIC_SAFETY_ENTID']
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
  

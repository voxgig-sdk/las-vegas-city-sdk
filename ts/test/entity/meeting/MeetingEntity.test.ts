

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


describe('MeetingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAS_VEGAS_CITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAS_VEGAS_CITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LasVegasCitySDK.test()
    const ent = testsdk.Meeting()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAS_VEGAS_CITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'meeting.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uri","name":"agendaUrl","req":false,"type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"date","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"location","req":false,"type":"`$STRING`","index$":3},{"active":true,"format":"uri","name":"minutesUrl","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"title","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"type","req":false,"type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"meeting","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"type","orig":"type","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /meetings","json":"{\"operationId\":\"getMeetings\",\"parameters\":[{\"description\":\"Filter meetings starting from this date (ISO 8601 format)\",\"in\":\"query\",\"name\":\"startDate\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Filter by meeting type\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"agendaUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"date\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"minutesUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"status\":{\"enum\":[\"scheduled\",\"in_progress\",\"completed\",\"cancelled\"],\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/meetings","segments":[{"lit":"meetings"}],"select":{"exist":["start_date","type"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"meeting","name__orig":"meeting","Name":"Meeting","name_":"meeting","name-":"meeting","NAME":"MEETING","index$":6}, {"active":true,"entity":"meeting","key$":"BasicMeetingFlow","kind":"basic","name":"BasicMeetingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"meeting_ref01"}}],"index$":0}]}, 'Meeting')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let meeting_ref01_data = Object.values(setup.data.existing.meeting)[0] as any

    // LIST
    const meeting_ref01_ent = client.Meeting()
    const meeting_ref01_match: any = {}

    const meeting_ref01_list = (await meeting_ref01_ent.list(meeting_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/meeting/MeetingTestData.json')

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
    ['meeting01','meeting02','meeting03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAS_VEGAS_CITY_TEST_MEETING_ENTID': idmap,
    'LAS_VEGAS_CITY_TEST_LIVE': 'FALSE',
    'LAS_VEGAS_CITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAS_VEGAS_CITY_TEST_MEETING_ENTID']

  const live = 'TRUE' === env.LAS_VEGAS_CITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAS_VEGAS_CITY_TEST_MEETING_ENTID']
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
  

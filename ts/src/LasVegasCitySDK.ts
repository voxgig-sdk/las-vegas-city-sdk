// LasVegasCity Ts SDK

import { CityInfoEntity } from './entity/CityInfoEntity'
import { CouncilEntity } from './entity/CouncilEntity'
import { DepartmentEntity } from './entity/DepartmentEntity'
import { EconomicDevelopmentEntity } from './entity/EconomicDevelopmentEntity'
import { EventEntity } from './entity/EventEntity'
import { JobEntity } from './entity/JobEntity'
import { MeetingEntity } from './entity/MeetingEntity'
import { NewEntity } from './entity/NewEntity'
import { ParkEntity } from './entity/ParkEntity'
import { PermitEntity } from './entity/PermitEntity'
import { PublicSafetyEntity } from './entity/PublicSafetyEntity'

export type * from './LasVegasCityTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { LasVegasCityEntityBase } from './LasVegasCityEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class LasVegasCitySDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  // Entity access: `client.CityInfo().list()` / `client.CityInfo().load({ id })`.
  CityInfo(data?: any) {
    const self = this
    return new CityInfoEntity(self,data)
  }


  // Entity access: `client.Council().list()` / `client.Council().load({ id })`.
  Council(data?: any) {
    const self = this
    return new CouncilEntity(self,data)
  }


  // Entity access: `client.Department().list()` / `client.Department().load({ id })`.
  Department(data?: any) {
    const self = this
    return new DepartmentEntity(self,data)
  }


  // Entity access: `client.EconomicDevelopment().list()` / `client.EconomicDevelopment().load({ id })`.
  EconomicDevelopment(data?: any) {
    const self = this
    return new EconomicDevelopmentEntity(self,data)
  }


  // Entity access: `client.Event().list()` / `client.Event().load({ id })`.
  Event(data?: any) {
    const self = this
    return new EventEntity(self,data)
  }


  // Entity access: `client.Job().list()` / `client.Job().load({ id })`.
  Job(data?: any) {
    const self = this
    return new JobEntity(self,data)
  }


  // Entity access: `client.Meeting().list()` / `client.Meeting().load({ id })`.
  Meeting(data?: any) {
    const self = this
    return new MeetingEntity(self,data)
  }


  // Entity access: `client.New().list()` / `client.New().load({ id })`.
  New(data?: any) {
    const self = this
    return new NewEntity(self,data)
  }


  // Entity access: `client.Park().list()` / `client.Park().load({ id })`.
  Park(data?: any) {
    const self = this
    return new ParkEntity(self,data)
  }


  // Entity access: `client.Permit().list()` / `client.Permit().load({ id })`.
  Permit(data?: any) {
    const self = this
    return new PermitEntity(self,data)
  }


  // Entity access: `client.PublicSafety().list()` / `client.PublicSafety().load({ id })`.
  PublicSafety(data?: any) {
    const self = this
    return new PublicSafetyEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new LasVegasCitySDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return LasVegasCitySDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'LasVegasCity' }
  }

  toString() {
    return 'LasVegasCity ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = LasVegasCitySDK


export {
  stdutil,

  BaseFeature,
  LasVegasCityEntityBase,

  LasVegasCitySDK,
  SDK,
}



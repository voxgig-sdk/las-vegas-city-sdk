
import { Context } from './Context'


class LasVegasCityError extends Error {

  isLasVegasCityError = true

  sdk = 'LasVegasCity'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LasVegasCityError
}


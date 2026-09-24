
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LasVegasCitySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LasVegasCitySDK.test()
    equal(testsdk instanceof LasVegasCitySDK, true,
      'LasVegasCitySDK.test() must return a client synchronously')
  })

})

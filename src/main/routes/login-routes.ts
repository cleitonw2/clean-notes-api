import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/controllers'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}

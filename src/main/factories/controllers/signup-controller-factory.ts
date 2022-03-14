import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbAddAccount } from '../uescases'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  return new SignUpController(
    makeSignUpValidation(),
    makeDbAddAccount()
  )
}

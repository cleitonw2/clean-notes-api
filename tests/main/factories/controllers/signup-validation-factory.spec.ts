import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { makeSignUpValidation } from '@/main/factories/controllers/signup-validation-factory'

class EmailValidatorStub implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => new EmailValidatorStub()

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

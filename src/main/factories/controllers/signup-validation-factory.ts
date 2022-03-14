import { EmailValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}

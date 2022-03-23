import { EmailValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidation, PasswordValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new PasswordValidation('password'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}

import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fildName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  isValid (input: any): boolean | Error {
    const isValidEmail = this.emailValidator.isValid(input[this.fildName])
    if (!isValidEmail) return new InvalidParamError('email')
    return false
  }
}

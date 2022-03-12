import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fildName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  isValid (input: any): boolean | Error {
    this.emailValidator.isValid(input[this.fildName])
    return false
  }
}

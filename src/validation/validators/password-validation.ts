import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class PasswordValidation implements Validation {
  constructor (private readonly fildName: string) {}

  isValid (input: any): boolean | Error {
    const password = input[this.fildName]
    const minLength = 5
    if (password.length < minLength) return new InvalidParamError(this.fildName)
    return false
  }
}

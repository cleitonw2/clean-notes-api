import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fildName: string) {}

  isValid (input: any): boolean | Error {
    if (!input[this.fildName]) return new MissingParamError(this.fildName)
    return false
  }
}

import { Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  isValid (input: any): boolean | Error {
    for (const validation of this.validations) {
      const error = validation.isValid(input)
      if (error) return error
    }
    return false
  }
}

import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  result: Error | boolean = true
  data: any

  isValid (data: any): Error | boolean {
    this.data = data
    return this.result
  }
}

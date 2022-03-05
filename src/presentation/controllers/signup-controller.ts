import { badRequest, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.isValid(request) as any
      if (error) return badRequest(error)
      return null as any
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}

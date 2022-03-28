import { Authentication } from '@/usecases/authentication'
import { badRequest, serverError, unauthorized } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.isValid(request) as any
      if (error) return badRequest(error)
      const result = await this.authentication.auth(request)
      if (!result) return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}

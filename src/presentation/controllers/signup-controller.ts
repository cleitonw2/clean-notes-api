import { Controller, HttpResponse, Validation } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    await this.validation.isValid(request)
    return null as any
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}

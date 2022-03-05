import { AddAccount } from '@/usecases/add-account'
import { EmailInUseError } from '../errors'
import { badRequest, forbidden, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.isValid(request) as any
      if (error) return badRequest(error)
      const result = await this.addAccount.add(request) as any
      if (!result) return forbidden(new EmailInUseError())
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

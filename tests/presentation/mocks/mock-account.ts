import { AddAccount } from '@/usecases/add-account'
import { Authentication } from '@/usecases/authentication'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result: AddAccount.Result = {
    accessToken: 'any_token'
  }

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = data
    return Promise.resolve(this.result)
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: 'any_token'
  }

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    this.params = data
    return Promise.resolve(this.result)
  }
}

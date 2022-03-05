import { AddAccount } from '@/usecases/add-account'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = {
    accessToken: 'any_token'
  }

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = data
    return Promise.resolve(this.result)
  }
}

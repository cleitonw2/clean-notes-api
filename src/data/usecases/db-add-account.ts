import { AddAccount } from '@/usecases/add-account'
import { AddAccountRepository } from '../protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly addAccountRepository: AddAccountRepository) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    await this.addAccountRepository.add(data)
    return null as any
  }
}

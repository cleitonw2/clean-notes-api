import { AddAccount } from '@/usecases/add-account'
import { AddAccountRepository, Hasher } from '../protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher
  ) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    await this.hasher.hash(data.password)
    await this.addAccountRepository.add(data)
    return null as any
  }
}

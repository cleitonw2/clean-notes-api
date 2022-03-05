import { AddAccount } from '@/usecases/add-account'
import { AddAccountRepository, Encrypter, Hasher } from '../protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter
  ) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    data.password = await this.hasher.hash(data.password)
    const { id } = await this.addAccountRepository.add(data)
    const accessToken = await this.encrypter.encrypt(id)
    return { accessToken }
  }
}

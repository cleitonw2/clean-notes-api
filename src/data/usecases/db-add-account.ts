import { AddAccount } from '@/usecases/add-account'
import { AddAccountRepository, Encrypter, Hasher, CheckAccountByEmailRepository } from '../protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    await this.checkAccountByEmailRepository.checkByEmail(data.email)
    data.password = await this.hasher.hash(data.password)
    const { id } = await this.addAccountRepository.add(data)
    const accessToken = await this.encrypter.encrypt(id)
    return { accessToken }
  }
}

import { Authentication } from '@/usecases/authentication'
import { Encrypter, HashComparer, LoadAccountByEmailRepository } from '../protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(data.email)
    if (account) {
      const isValid = await this.hashComparer.compare(data.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        return { accessToken }
      }
    }
    return false
  }
}

import { Authentication } from '@/usecases/authentication'
import { HashComparer, LoadAccountByEmailRepository } from '../protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(data.email)
    if (account) {
      await this.hashComparer.compare(data.password, account.password)
    }
    return false
  }
}

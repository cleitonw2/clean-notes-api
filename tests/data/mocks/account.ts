import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = {
    id: 'any_id'
  }

  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = data
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  result: boolean = false
  email: string

  async checkByEmail (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}

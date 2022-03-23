import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from '@/data/protocols'

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

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  result = {
    id: 'any_id',
    password: 'any_password'
  }

  email: string

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return Promise.resolve(this.result)
  }
}

import { AddAccount } from '@/usecases/add-account'
import { AddAccountRepository } from '@/data/add-account-repository'

class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params

  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = data
    return {
      id: 'any_id'
    }
  }
}

class DbAddAccount implements AddAccount {
  constructor (private readonly addAccountRepository: AddAccountRepository) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    await this.addAccountRepository.add(data)
    return null as any
  }
}

describe('DbAddAccount', () => {
  it('Should call AddAccountRepository with correct values', async () => {
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const sut = new DbAddAccount(addAccountRepositorySpy)
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.add(params)
    expect(params).toEqual(addAccountRepositorySpy.params)
  })
})

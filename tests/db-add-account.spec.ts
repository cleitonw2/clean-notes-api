import { AddAccountRepository } from '@/data/protocols'
import { DbAddAccount } from '@/data/usecases'

class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params

  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = data
    return {
      id: 'any_id'
    }
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

import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy } from '../mocks'

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

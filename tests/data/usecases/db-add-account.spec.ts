import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(addAccountRepositorySpy)
  return {
    sut,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount', () => {
  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.add(params)
    expect(params).toEqual(addAccountRepositorySpy.params)
  })
})

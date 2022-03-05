import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, HaserSpy } from '../mocks'

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositorySpy: AddAccountRepositorySpy
  hasherSpy: HaserSpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HaserSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(addAccountRepositorySpy, hasherSpy)
  return {
    sut,
    addAccountRepositorySpy,
    hasherSpy
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

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const promise = sut.add(params)
    expect(promise).rejects.toThrow()
  })

  it('Should call Hasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut()
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.add(params)
    expect(params.password).toBe(hasherSpy.value)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockRejectedValueOnce(new Error())
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const promise = sut.add(params)
    expect(promise).rejects.toThrow()
  })
})

import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, EncrypterSpy, HaserSpy } from '../mocks'

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositorySpy: AddAccountRepositorySpy
  hasherSpy: HaserSpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HaserSpy()
  const encrypterSpy = new EncrypterSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(addAccountRepositorySpy, hasherSpy, encrypterSpy)
  return {
    sut,
    addAccountRepositorySpy,
    hasherSpy,
    encrypterSpy
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

  it('Should call Encrypter with correct value', async () => {
    const { sut, encrypterSpy, addAccountRepositorySpy } = makeSut()
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.add(params)
    expect(addAccountRepositorySpy.result.id).toBe(encrypterSpy.value)
  })
})

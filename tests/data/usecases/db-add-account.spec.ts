import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, EncrypterSpy, HaserSpy } from '../mocks'

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositorySpy: AddAccountRepositorySpy
  hasherSpy: HaserSpy
  encrypterSpy: EncrypterSpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HaserSpy()
  const encrypterSpy = new EncrypterSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(
    addAccountRepositorySpy,
    hasherSpy,
    encrypterSpy,
    checkAccountByEmailRepositorySpy
  )
  return {
    sut,
    addAccountRepositorySpy,
    hasherSpy,
    encrypterSpy,
    checkAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount', () => {
  it('Should call CheckAccountByEmailRepository with correct value', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.add(params)
    expect(params.email).toEqual(checkAccountByEmailRepositorySpy.email)
  })

  it('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const result = await sut.add(params)
    expect(result).toBe(false)
  })

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

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockRejectedValueOnce(new Error())
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const promise = sut.add(params)
    expect(promise).rejects.toThrow()
  })

  it('Should return on accessToken on success', async () => {
    const { sut, encrypterSpy } = makeSut()
    const params = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const result = await sut.add(params) as any
    expect(result.accessToken).toBe(encrypterSpy.result)
  })
})

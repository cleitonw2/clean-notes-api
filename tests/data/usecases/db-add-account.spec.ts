import { DbAddAccount } from '@/data/usecases'
import { mockAccountParams } from '@/../tests/usecases'
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
    const params = mockAccountParams()
    await sut.add(params)
    expect(params.email).toEqual(checkAccountByEmailRepositorySpy.email)
  })

  it('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const result = await sut.add(mockAccountParams())
    expect(result).toBe(false)
  })

  it('Should throw if CheckAccountByEmailRepository throws', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAccountParams())
    expect(promise).rejects.toThrow()
  })

  it('Should call Hasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut()
    const params = mockAccountParams()
    await sut.add(params)
    expect(params.password).toBe(hasherSpy.value)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAccountParams())
    expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const params = mockAccountParams()
    await sut.add(params)
    expect(params).toEqual(addAccountRepositorySpy.params)
  })

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAccountParams())
    expect(promise).rejects.toThrow()
  })

  it('Should call Encrypter with correct value', async () => {
    const { sut, encrypterSpy, addAccountRepositorySpy } = makeSut()
    await sut.add(mockAccountParams())
    expect(addAccountRepositorySpy.result.id).toBe(encrypterSpy.value)
  })

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAccountParams())
    expect(promise).rejects.toThrow()
  })

  it('Should return on accessToken on success', async () => {
    const { sut, encrypterSpy } = makeSut()
    const result = await sut.add(mockAccountParams()) as any
    expect(result.accessToken).toBe(encrypterSpy.result)
  })
})

import { DbAuthentication } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy, HashComparerSpy, EncrypterSpy } from '../mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
  }
}

const authParams = {
  email: 'any_email@mail.com',
  password: 'any_password'
}

describe('DbAddAccount', () => {
  it('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(authParams)
    expect(loadAccountByEmailRepositorySpy.email).toEqual(authParams.email)
  })

  it('Should return false if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null as any
    const result = await sut.auth(authParams)
    expect(result).toBe(false)
  })

  it('Should throw if LoadAccountByEmailRepository throws', () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockRejectedValueOnce(new Error())
    const promise = sut.auth(authParams)
    expect(promise).rejects.toThrow()
  })

  it('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(authParams)
    expect(hashComparerSpy.value).toBe(authParams.password)
    expect(hashComparerSpy.hash).toBe(loadAccountByEmailRepositorySpy.result.password)
  })

  it('Should return false if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.result = false
    const result = await sut.auth(authParams)
    expect(result).toBe(false)
  })

  it('Should throw if HashComparer throws', () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.auth(authParams)
    expect(promise).rejects.toThrow()
  })

  it('Should call Encrypter with correct value', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(authParams)
    expect(encrypterSpy.value).toBe(loadAccountByEmailRepositorySpy.result.id)
  })

  it('Should throw if Encrypter throws', () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.auth(authParams)
    expect(promise).rejects.toThrow()
  })

  it('Should return a accessToken if Encrypter returns a token', async () => {
    const { sut, encrypterSpy } = makeSut()
    const result = await sut.auth(authParams) as any
    expect(result?.accessToken).toBe(encrypterSpy.result)
  })
})

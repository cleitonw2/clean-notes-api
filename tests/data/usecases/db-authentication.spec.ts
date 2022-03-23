import { DbAuthentication } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy, HashComparerSpy } from '../mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy
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

  it('Should throw if LoadAccountByEmailRepository throws', async () => {
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

  it.todo('Should return false if HashComparer returns false')
  it.todo('Should throw if HashComparer throws')

  it.todo('Should call Encrypter with correct value')
  it.todo('Should throw if Encrypter throws')
  it.todo('Should return a accessToken if Encrypter returns a token')
})

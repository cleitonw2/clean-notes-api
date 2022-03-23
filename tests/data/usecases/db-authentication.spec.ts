import { DbAuthentication } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy
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
    expect(authParams.email).toEqual(loadAccountByEmailRepositorySpy.email)
  })

  it('Should return false if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null as any
    const result = await sut.auth(authParams)
    expect(result).toBe(false)
  })

  it.todo('Should throw if LoadAccountByEmailRepository throws')

  it.todo('Should call HashComparer with correct values')
  it.todo('Should return false if HashComparer returns false')
  it.todo('Should throw if HashComparer throws')

  it.todo('Should call Encrypter with correct value')
  it.todo('Should throw if Encrypter throws')
  it.todo('Should return a accessToken if Encrypter returns a token')
})

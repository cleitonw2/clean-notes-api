import { LoginController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy } from '../mocks'

const mockRequest = (): LoginController.Request => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: LoginController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('Login Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.data).toEqual(request)
  })

  it('Should return 400 if Validation returns error', async () => {
    const { sut, validationSpy } = makeSut()
    const error = new Error()
    validationSpy.result = error
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it.todo('Should return 500 if Validation throws')

  it.todo('Should call Authentication with correct values')

  it.todo('Should return 403 if Authentication returns false')

  it.todo('Should return 500 if Authentication throws')

  it.todo('Should return a accessToken on success')
})

import { SignUpController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy } from '../mocks'

const mockRequest = (): SignUpController.Request => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: SignUpController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(validationSpy)
  return {
    sut,
    validationSpy
  }
}
describe('SignUp Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(request).toEqual(validationSpy.data)
  })

  it('Should return 400 if Validation returns error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
import { SignUpController } from '@/presentation/controllers'
import { badRequest, serverError, forbidden, ok } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { AddAccountSpy, ValidationSpy } from '../mocks'

const mockRequest = (): SignUpController.Request => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: SignUpController
  validationSpy: ValidationSpy
  addAccount: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addAccount = new AddAccountSpy()
  const sut = new SignUpController(validationSpy, addAccount)
  return {
    sut,
    validationSpy,
    addAccount
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

  it('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'isValid').mockImplementation(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccount } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(request).toEqual(addAccount.params)
  })

  it('Should return 403 if AddAccount returns false', async () => {
    const { sut, addAccount } = makeSut()
    addAccount.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccount } = makeSut()
    jest.spyOn(addAccount, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return a accessToken on success', async () => {
    const { sut, addAccount } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addAccount.result))
  })
})

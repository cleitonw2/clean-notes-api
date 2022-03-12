import { EmailValidation } from '@/validation/validators'
import { EmailValidatorSpy } from '@/../tests/validation/mocks'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
  email: string
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const email = 'any_email@mail.com'
  const sut = new EmailValidation('email', emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy,
    email
  }
}

describe('EmailValidation', () => {
  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy, email } = makeSut()
    sut.isValid({ email: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  it('Should return a error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.resutl = false
    const error = sut.isValid({ email: 'any_email' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('Should return throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.isValid).toThrow()
  })

  it('Should return false if EmailValidator returns true', () => {
    const { sut, email } = makeSut()
    const error = sut.isValid({ email })
    expect(error).toBe(false)
  })
})

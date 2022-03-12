import { EmailValidation } from '@/validation/validators'
import { EmailValidatorSpy } from '@/../tests/validation/mocks'

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
})

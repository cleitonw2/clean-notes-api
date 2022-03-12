import validator from 'validator'
import { EmailValidatorAdapter } from '@/infra/validators'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()

describe('EmailValidatorAdapter', () => {
  it('Should call isEmail with correct value', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('Should return false if isEmail returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  it('Should throw if isEmail throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce((): any => {
      throw new Error()
    })
    expect(sut.isValid).toThrow()
  })

  it('Should return true on success', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })
})

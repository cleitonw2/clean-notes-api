import { InvalidParamError } from '@/presentation/errors'
import { PasswordValidation } from '@/validation/validators'

const makeSut = (): PasswordValidation => new PasswordValidation('password')

describe('PasswordValidation', () => {
  it('Should return a InvalidParamError if password less then five', () => {
    const sut = makeSut()
    const error = sut.isValid({ password: 'any' })
    expect(error).toEqual(new InvalidParamError('password'))
  })

  it('Should return false if validation success', () => {
    const sut = makeSut()
    const error = sut.isValid({ password: 'valid_password' })
    expect(error).toBe(false)
  })
})

import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field')

describe('RequiredFieldValidation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.isValid({ invalid_field: 'any' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should return false if validation success', () => {
    const sut = makeSut()
    const error = sut.isValid({ field: 'any' })
    expect(error).toBe(false)
  })
})

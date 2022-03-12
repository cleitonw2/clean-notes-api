import { ValidationComposite } from '@/validation/validators'
import { ValidationSpy } from '@/../tests/presentation/mocks'

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('ValidationConposite', () => {
  it('Should return error if Validation return error', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].result = new Error()
    const error = sut.isValid({ field: 'any' })
    expect(error).toEqual(new Error())
  })

  it('Should return the first error found', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].result = new Error('any_error')
    validationSpies[2].result = new Error()
    const error = sut.isValid({ field: 'any' })
    expect(error).toEqual(new Error('any_error'))
  })

  it('Should return false on success', () => {
    const { sut } = makeSut()
    const error = sut.isValid({ field: 'any' })
    expect(error).toBe(false)
  })
})

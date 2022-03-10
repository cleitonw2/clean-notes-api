import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}))

const secret = 'secret_key'
const makeSut = (): JwtAdapter => new JwtAdapter(secret)

describe('jwt', () => {
  describe('encrypt()', () => {
    it('Should call sign with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(hashSpy).toHaveBeenCalledWith({ id: 'any_value' }, secret)
    })

    it('Should return a token on sign success', async () => {
      const sut = makeSut()
      const token = await sut.encrypt('any_value')
      expect(token).toBe('any_token')
    })

    it('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_value')
      expect(promise).rejects.toThrow()
    })
  })
})

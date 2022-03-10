import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/criptography'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const sut = new BcryptAdapter(12)
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      console.log(hashSpy)
      expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
    })
  })
})

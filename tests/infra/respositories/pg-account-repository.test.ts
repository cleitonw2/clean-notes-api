import { prismaClient } from '@/infra/helpers'
import { PgAccountRepository } from '@/infra/repositories'

const makeSut = (): PgAccountRepository => new PgAccountRepository()

describe('PgAccountRepository', () => {
  afterAll(async () => {
    await prismaClient.account.deleteMany()
  })

  beforeEach(async () => {
    await prismaClient.account.deleteMany()
  })

  describe('add()', () => {
    it('Shuld create new account', async () => {
      const sut = makeSut()
      await sut.add({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
      const account = await prismaClient.account.findUnique({
        where: {
          email: 'any_email'
        }
      })
      expect(account?.id).toBeTruthy()
      expect(account?.password).toBe('any_password')
    })

    it('Shuld return id on create account', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
      expect(account?.id).toBeTruthy()
    })
  })

  describe('checkByEmail()', () => {
    it('Shuld return false if email not found', async () => {
      const sut = makeSut()
      const accountExists = await sut.checkByEmail('any_email')
      expect(accountExists).toBe(false)
    })
  })
})

import { prismaClient } from '@/infra/helpers'
import { PgAccountRepository } from '@/infra/repositories'

describe('PgAccountRepository', () => {
  afterAll(async () => {
    await prismaClient.account.deleteMany()
  })

  beforeEach(async () => {
    await prismaClient.account.deleteMany()
  })

  it('Shuld create new account', async () => {
    const sut = new PgAccountRepository()
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
})

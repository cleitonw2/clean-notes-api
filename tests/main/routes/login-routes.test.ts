import request from 'supertest'
import { PrismaClient } from '@prisma/client'
import { app } from '@/main/config/app'

const prismaClient = new PrismaClient()

describe('LoginRoutes', () => {
  afterAll(async () => {
    await prismaClient.account.deleteMany()
  })

  beforeEach(async () => {
    await prismaClient.account.deleteMany()
  })

  describe('SignUp', () => {
    it('Should return an accessToken on success', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send({
          name: 'valid_name',
          email: 'valid_mail@mail.com',
          password: 'valid_password'
        })
      expect(response.statusCode).toBe(200)
      expect(response.body.accessToken).toBeTruthy()
    })
  })
})

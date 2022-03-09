import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'
import { prismaClient } from '@/infra/helpers'

export class PgAccountRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    return await prismaClient.account.create({
      data,
      select: { id: true }
    })
  }

  async checkByEmail (email: string): Promise<boolean> {
    return !!await prismaClient.account.findUnique({
      where: {
        email
      }
    })
  }
}

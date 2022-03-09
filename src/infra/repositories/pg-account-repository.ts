import { AddAccountRepository } from '@/data/protocols'
import { prismaClient } from '@/infra/helpers'

export class PgAccountRepository implements AddAccountRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    await prismaClient.account.create({
      data
    })
    return null as any
  }
}

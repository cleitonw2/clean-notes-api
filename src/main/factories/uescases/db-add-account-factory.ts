import { DbAddAccount } from '@/data/usecases'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'
import { PgAccountRepository } from '@/infra/repositories'
import { env } from '@/main/config/env'
import { AddAccount } from '@/usecases/add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const pgAccountRepository = new PgAccountRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.secret)
  return new DbAddAccount(pgAccountRepository, bcryptAdapter, jwtAdapter, pgAccountRepository)
}

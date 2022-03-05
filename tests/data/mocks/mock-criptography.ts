import { Hasher, Encrypter } from '@/data/protocols'

export class HaserSpy implements Hasher {
  result: string = 'any_password'
  value: string

  async hash (value: string): Promise<string> {
    this.value = value
    return this.result
  }
}

export class EncrypterSpy implements Encrypter {
  result: string = 'any_token'
  value: string

  async encrypt (value: string): Promise<string> {
    this.value = value
    return this.result
  }
}

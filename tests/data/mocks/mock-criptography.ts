import { Hasher, Encrypter, HashComparer } from '@/data/protocols'

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

export class HashComparerSpy implements HashComparer {
  result: boolean = true
  value: string
  hash: string

  async compare (value: string, hash: string): Promise<boolean> {
    this.value = value
    this.hash = hash
    return Promise.resolve(this.result)
  }
}

import { Hasher } from '@/data/protocols'

export class HaserSpy implements Hasher {
  result: string = 'any_result'
  value: string

  async hash (value: string): Promise<string> {
    this.value = value
    return this.result
  }
}

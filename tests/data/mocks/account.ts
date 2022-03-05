import { AddAccountRepository } from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = {
    id: 'any_id'
  }

  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = data
    return this.result
  }
}

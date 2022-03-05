import { AddAccountRepository } from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params

  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = data
    return {
      id: 'any_id'
    }
  }
}

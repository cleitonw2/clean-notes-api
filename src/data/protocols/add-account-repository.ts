export interface AddAccountRepository {
  add: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = {
    name: string
    email: string
    password: string
  }
  export type Result = {
    id: string
  }
}

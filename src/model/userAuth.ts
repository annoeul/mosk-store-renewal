export type UserAuthT = {
  email: string
  password: string | number
  passwordCheck?: string | number
}

export type StoreAuthT = {
  storeName: string
  ownerName: string
  call: string
  address: string
  crn: string
}

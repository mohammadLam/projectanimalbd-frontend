import { genderType } from './type'

export default interface Member {
  name: string
  age: number
  gender: genderType
  address: string
  phone: string
  password: string
}

export interface SignupReqBody extends Member {
  repass: string
}

export interface MemberResponse extends Member {
  totalOperationComplete: number
  date: Date
}

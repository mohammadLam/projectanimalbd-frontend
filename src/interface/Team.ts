import Member from './Member'

export interface BasicTeam {
  _id: string
  adminId: string
  name: string
  location: [number, number]
  address: string
  members: Member[]
  contact: {
    phone: string
    email: string
    link: string
  }
  fund: number
}

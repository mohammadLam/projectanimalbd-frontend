import Member from './Member'

export interface CreateTeam {
  _id: string
  admin: string
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

export interface Team {
  _id: string
  admin: {
    name: string
    phone: string
  }
  name: string
  location: {
    type: 'Point',
    coordinates: [number, number]
  }
  address: string
  members: Member[]
  contact: {
    phone: string
    email: string
    link: string
  }
  fund: number
}

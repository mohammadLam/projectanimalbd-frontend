import React, { createContext, useReducer } from 'react'
export interface IRequest {
  _id: string
  member: {
    name: string
    phone: string
  }
  team: {
    _id: string
    name: string
  }
  location: number[]
  address: string
  photos: string[]
  description: string
  createdAt: string
  status: 'pending' | 'done' | 'reject'
}

const initialState: IRequest[] = []

type ACTIONTYPE = { type: 'store'; payload: IRequest[] } |
{
  type: 'delete'; id: string
} | {
  type: 'reject'; id: string
}

const reducerFunction = (state: IRequest[], action: ACTIONTYPE) => {
  switch (action.type) {
    case 'store':
      return action.payload
    case 'reject': {
      return state.map(request => {
        return {...request, status: request._id === action.id ? 'reject' : request.status }
      })
    }
    default:
      return state
  }
}

interface ContextType {
  requests: IRequest[]
  requestsDispatch: React.Dispatch<ACTIONTYPE>
}

export const RequestContext = createContext<ContextType>(null!)

export const RequestProvider: React.FC = ({ children }) => {
  const [requests, requestsDispatch] = useReducer(reducerFunction, initialState)

  return <RequestContext.Provider value={{ requests, requestsDispatch }}>{children}</RequestContext.Provider>
}

import React, { createContext, useReducer } from 'react'
export interface IMember {
  _id: string
  name: string
  address: string
  phone: string
}

const initialState: IMember[] = []

type ACTIONTYPE =
  | { type: 'store'; payload: IMember[] }
  | {
      type: 'remove'
      id: string
    }
  | {
      type: 'clear'
    }

const reducerFunction = (state: IMember[], action: ACTIONTYPE) => {
  switch (action.type) {
    case 'store':
      return action.payload
    case 'remove': {
      return state.filter(member => member._id !== action.id)
    }
    case 'clear': {
      return []
    }
    default:
      return state
  }
}

interface ContextType {
  members: IMember[]
  membersDispatch: React.Dispatch<ACTIONTYPE>
}

export const MemberContext = createContext<ContextType>(null!)

export const MemberProvider: React.FC = ({ children }) => {
  const [members, membersDispatch] = useReducer(reducerFunction, initialState)

  return (
    <MemberContext.Provider value={{ members, membersDispatch }}>{children}</MemberContext.Provider>
  )
}

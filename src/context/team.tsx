import React, { createContext, useReducer } from 'react'
import { Team } from '../interface/Team'

const initialState: Team[] = []

type ACTIONTYPE = { type: 'store'; payload: Team[] }

const reducerFunction = (state: Team[], action: ACTIONTYPE) => {
  switch (action.type) {
    case 'store':
      return action.payload
    default:
      return state
  }
}

interface ContextType {
  teams: Team[]
  dispatch: React.Dispatch<ACTIONTYPE>
}

export const TeamContext = createContext<ContextType>(null!)

export const TeamProvider: React.FC = ({ children }) => {
  const [teams, dispatch] = useReducer(reducerFunction, initialState)

  return <TeamContext.Provider value={{ teams, dispatch }}>{children}</TeamContext.Provider>
}

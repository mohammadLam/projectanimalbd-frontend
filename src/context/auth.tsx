import React, { createContext, useReducer } from 'react'

type ACTIONTYPE = { type: 'authenticated' | 'unauthenticated' }

const reducerFunction = (state: boolean, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'authenticated':
      return true

    case 'unauthenticated':
      return false
    default:
      return state
  }
}

interface ContextType {
  isAuthenticated: boolean
  dispatch: React.Dispatch<ACTIONTYPE>
}

export const AuthContext = createContext<ContextType>({} as ContextType)

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, dispatch] = useReducer(reducerFunction, false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

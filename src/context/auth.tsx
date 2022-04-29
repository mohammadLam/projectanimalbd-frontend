import React, { createContext, useReducer } from 'react'

interface Authorized {
  authenticated: boolean
  memberId: string
  team?: {
    id: string
    isTeamAdmin: boolean
  }
}

interface Unauthorized {
  authenticated: boolean
}

type ACTIONTYPE = { type: 'authenticated'; payload: Authorized } | { type: 'unauthenticated' }

const defaultState: Unauthorized | Authorized = {
  authenticated: false
}

/*
  {
    authenticated: false,
  },
  {
    authenticated: true,
    memberId: 624ec2d4b58223cc49d8eb25
  },
  {
    authenticated: true,
    memberId: 624ec2d4b58223cc49d8eb25,
    team: {
      id: 625565e3211cd74fa8823242,
      isTeamAdmin: false
    }
  }
*/

const reducerFunction = (state: Authorized | Unauthorized, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'authenticated': {
      const { memberId, team } = action.payload

      if (team) {
        return {
          authenticated: true,
          memberId: memberId,
          team: {
            id: team.id,
            isTeamAdmin: team.isTeamAdmin
          }
        }
      }
      return {
        authenticated: true,
        memberId: action.payload.memberId
      }
    }
    case 'unauthenticated':
      return {
        authenticated: false
      }
    default:
      return state
  }
}

interface ContextType {
  auth: Authorized | Unauthorized
  dispatch: React.Dispatch<ACTIONTYPE>
}

export const AuthContext = createContext<ContextType>(null!)

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, dispatch] = useReducer(reducerFunction, defaultState)

  return <AuthContext.Provider value={{ auth, dispatch }}>{children}</AuthContext.Provider>
}

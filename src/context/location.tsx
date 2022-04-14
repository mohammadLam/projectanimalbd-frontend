import React, { createContext, useEffect, useReducer } from 'react'

type location = [number, number]

const initialState: location = [0, 0]

type ACTIONTYPE = { type: 'store'; payload: location }

const reducerFunction = (state: location, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'store':
      return action.payload
    default:
      return state
  }
}

interface ContextType {
  location: location
  dispatch: React.Dispatch<ACTIONTYPE>
}

export const LocationContext = createContext<ContextType>({} as ContextType)

export const LocationProvider: React.FC = ({ children }) => {
  const [location, dispatch] = useReducer(reducerFunction, initialState)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({
        type: 'store',
        payload: [position.coords.latitude, position.coords.longitude]
      })
    })
  }, [])

  return (
    <LocationContext.Provider value={{ location, dispatch }}>
      {children}
    </LocationContext.Provider>
  )
}

import React, { createContext, useEffect, useReducer } from 'react'

type location = [number, number]

const initialState: location = [0, 0]

type ACTIONTYPE = { type: 'store'; payload: location }

const reducerFunction = (state: location, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'store': {
      return action.payload
    }
    default: {
      return state
    }
  }
}

interface ContextType {
  location: location
  locationDispatch: React.Dispatch<ACTIONTYPE>
}

export const LocationContext = createContext<ContextType>(null!)

export const LocationProvider: React.FC = ({ children }) => {
  const [location, locationDispatch] = useReducer(reducerFunction, initialState)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      locationDispatch({
        type: 'store',
        payload: [position.coords.longitude, position.coords.latitude]
      })
    })
  }, [])

  return (
    <LocationContext.Provider value={{ location, locationDispatch }}>{children}</LocationContext.Provider>
  )
}

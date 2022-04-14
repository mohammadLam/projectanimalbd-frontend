import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { LocationProvider } from './context/location'
import { AuthProvider } from './context/auth'
import { TeamProvider } from './context/team'

ReactDOM.render(
  <LocationProvider>
    <AuthProvider>
      <TeamProvider>
        <App />
      </TeamProvider>
    </AuthProvider>
  </LocationProvider>,
  document.getElementById('root')
)

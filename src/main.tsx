import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { LocationProvider } from './context/location'
import { AuthProvider } from './context/auth'
import { TeamProvider } from './context/team'
import React from 'react'

ReactDOM.render(
  <React.StrictMode>
    <LocationProvider>
      <AuthProvider>
        <TeamProvider>
          <App />
        </TeamProvider>
      </AuthProvider>
    </LocationProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

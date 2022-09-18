import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { LocationProvider } from './context/location'
import { AuthProvider } from './context/auth'
import { TeamProvider } from './context/team'
import { RequestProvider } from './context/Request'
import { MemberProvider } from './context/member'

import React from 'react'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <LocationProvider>
        <TeamProvider>
          <RequestProvider>
            <MemberProvider>
              <App />
            </MemberProvider>
          </RequestProvider>
        </TeamProvider>
      </LocationProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

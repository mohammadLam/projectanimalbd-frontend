import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Context
import { AuthContext } from './context/auth'

// Components
import Navigation from './component/navigation'
import Modal from './component/Modal'

// Routes
import { AuthenticateRoute, UnauthenticatedRoute } from './route/authenticate'

// Pages
import Home from './page/Home'
import Signup from './page/Signup'
import Login from './page/Login'
import ForgotPassword from './page/ForgotPassword'
import Teamlist from './page/Team'
import Profile from './page/Profile'

const App: React.FC = () => {
  const { dispatch } = useContext(AuthContext)

  // axios.defaults.baseURL = 'https://animal-help-bd.herokuapp.com/api/'
  axios.defaults.baseURL = 'http://localhost:3001/api/'
  axios.interceptors.response.use(
    response => response,
    async err => {
      if (err.response.status === 400) {
        try {
          await axios.get('/token/refresh-token', {
            withCredentials: true
          })

          return axios(err.config)
        } catch (error) {
          console.log(error)
        }
      }
    }
  )

  useEffect(() => {
    const memberAuthenticated = async () => {
      try {
        const authenticated = await axios.get('/member/authenticated', {
          withCredentials: true
        })
        if (authenticated.status === 200) {
          dispatch({ type: 'authenticated' })
        }
      } catch (error) {
        console.log(error)
      }
    }
    memberAuthenticated()
  }, [])

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<UnauthenticatedRoute />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/changepass' element={<ForgotPassword />} />
        </Route>
        <Route element={<AuthenticateRoute />}>
          <Route path='/teams' element={<Teamlist />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

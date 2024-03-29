import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Context
import { AuthContext } from './context/auth'

// Components
import Navigation from './component/navigation'

// Routes
import { AuthenticateRoute, UnauthenticatedRoute } from './route/authenticate'

// Pages
import Home from './page/Home'
import Signup from './page/Signup'
import Login from './page/Login'
import ForgotPassword from './page/ForgotPassword'
import Team from './page/Team'
import Profile from './page/Profile'
import Contact from './page/Contact'
import About from './page/About'
import Request from './page/Request'
import Donation from './page/Donation'
import DonateSuccess from './page/DonateSuccess'

const App: React.FC = () => {
  const { dispatch } = useContext(AuthContext)

  // axios.defaults.baseURL = 'https://projectanimalbd.herokuapp.com/api/'
  axios.defaults.baseURL = 'http://localhost:3001/api'
  // axios.defaults.baseURL = 'http://192.168.2.114:3001/api'

  useEffect(() => {
    const memberAuthenticated = async () => {
      try {
        const { status, data } = await axios.get('/member/authenticated', {
          withCredentials: true
        })
        if (status === 200) {
          dispatch({
            type: 'authenticated',
            payload: {
              authenticated: true,
              ...data
            }
          })
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
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/donate' element={<Donation />} />
        <Route path='/donate/success/:incomeId' element={<DonateSuccess />} />
        <Route element={<UnauthenticatedRoute />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/changepass' element={<ForgotPassword />} />
        </Route>
        <Route element={<AuthenticateRoute />}>
          <Route path='/teams' element={<Team />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/request' element={<Request />} />
        </Route>
      </Routes>

      <Toaster
        position='top-right'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff'
          },
          // Default options for specific types
          success: {
            duration: 2000,
            theme: {
              primary: 'green',
              secondary: 'black'
            }
          }
        }}
      />
    </BrowserRouter>
  )
}

export default App

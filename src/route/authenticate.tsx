import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export const AuthenticateRoute: React.FC = () => {
  const { auth } = useContext(AuthContext)

  return auth.authenticated ? <Outlet /> : <Navigate to='/login' />
}

export const UnauthenticatedRoute: React.FC = () => {
  const { auth } = useContext(AuthContext)

  return auth.authenticated ? <Navigate to='/' /> : <Outlet />
}

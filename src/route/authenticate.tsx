import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export const AuthenticateRoute: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export const UnauthenticatedRoute: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? <Navigate to='/' /> : <Outlet />
}

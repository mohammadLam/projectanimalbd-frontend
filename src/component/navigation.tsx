import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.svg'
import { AuthContext } from '../context/auth'
import axios from 'axios'

const Navigation: React.FC = () => {
  const { isAuthenticated, dispatch } = useContext(AuthContext)
  const logout = async () => {
    try {
      await axios.delete('/member/logout', {
        withCredentials: true
      })
      dispatch({ type: 'unauthenticated' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className='h-[60px] bg-white border-b border-gray-300 flex items-center'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='grid grid-cols-3'>
          <img src={logo} alt='logo' />
          {/* <h1 className='logo__text'>Help Animal BD</h1> */}
        </div>
        <div className='nav__links_container'>
          <Link to='/'>Home</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='/about'>About</Link>
          <Link to='/teams'>Team</Link>
          <Link to='/contact'>Contact</Link>
          {!isAuthenticated && <Link to='/login'>Login</Link>}
        </div>

        <div className='flex gap-x-5'>
          <button className='text-purple-500 transition-colors'>Donate</button>
          {isAuthenticated && (
            <button
              className='cursor-pointer text-red-500 transition-colors'
              onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

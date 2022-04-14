import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.jpg'
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
    <nav className='h-[60px] bg-white shadow flex items-center'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='grid grid-cols-3'>
          <img className='w-12' src={logo} alt='logo' />
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

        <div className='flex gap-x-3'>
          {isAuthenticated && (
            <button
              className='bg-red-500 hover:bg-red-600 cursor-pointer px-4 py-1 rounded text-white transition-colors'
              onClick={logout}>
              Logout
            </button>
          )}
          <div className='bg-purple-500 hover:bg-purple-600 cursor-pointer px-4 py-1 rounded text-white transition-colors'>
            Donate
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../img/logo.svg'
import { AuthContext } from '../context/auth'
import axios from 'axios'
import menu from '../img/menu.svg'
import close from '../img/close.svg'
import Container from './Container'

const Navigation: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const navigate = useNavigate()

  const { auth, dispatch } = useContext(AuthContext)
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
    <nav className='h-[60px] bg-white border-b border-gray-300 flex items-center px-5 lg:px-0'>
      <Container className='flex justify-between items-center'>
        <div className='grid grid-cols-3'>
          <img src={logo} alt='logo' />
          {/* <h1 className='logo__text'>Help Animal BD</h1> */}
        </div>
        <div className='nav__links_container'>
          <Link to='/'>হোম</Link>
          {auth.authenticated && <Link to='/profile'>প্রোফাইল</Link>}
          <Link to='/about'>উদ্দেশ্য</Link>
          {auth.authenticated && <Link to='/teams'>টিম</Link>}
          {auth.authenticated && <Link to='/request'>অনুরোধ</Link>}
          {/* <Link to='/contact'>যোগাযোগ</Link> */}
          {!auth.authenticated && <Link to='/login'>লগ-ইন</Link>}
          {auth.authenticated && (
            <button
              className='px-3 py-1 hover:bg-red-50 cursor-pointer text-red-500'
              onClick={logout}
            >
              লগ-আউট
            </button>
          )}
        </div>

        <div className='hidden lg:flex gap-x-5'>
          <button
            className='bg-purple-500 text-white px-3 py-1 rounded transition-colors'
            onClick={() => navigate('/donate')}
          >
            সাহায্য করুন
          </button>
        </div>

        <button className='lg:hidden' onClick={() => setMenuIsOpen(prev => !prev)}>
          {menuIsOpen ? <img src={close} alt='close' /> : <img src={menu} alt='menu' />}
        </button>

        {menuIsOpen && <MobileNavigation />}
      </Container>
    </nav>
  )
}

const MobileNavigation: React.FC = () => {
  const { auth, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

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
    <nav className='bg-white border-b border-gray-300 py-5 flex items-center absolute top-[60px] left-0 z-[1000] w-full shadow-xl'>
      <div className='flex flex-col px-10'>
        <div className='grid grid-cols-1 gap-y-2 items-center mb-3'>
          <Link to='/'>হোম</Link>
          {auth.authenticated && <Link to='/profile'>প্রোফাইল</Link>}
          <Link to='/about'>আমাদের সম্পর্কে</Link>
          {auth.authenticated && <Link to='/teams'>টিম</Link>}
          {auth.authenticated && <Link to='/request'>অনুরোধ</Link>}
          <Link to='/contact'>যোগাযোগ</Link>
          {!auth.authenticated && <Link to='/login'>লগ-ইন</Link>}
        </div>

        <div className='flex gap-x-5'>
          {auth.authenticated && (
            <button
              className='cursor-pointer text-white px-3 py-1 rounded bg-red-500 transition-colors'
              onClick={logout}
            >
              লগ-আউট
            </button>
          )}
          <button
            className='bg-purple-500 text-white px-3 py-1 rounded transition-colors'
            onClick={() => navigate('/donate')}
          >
            সাহায্য করুন
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

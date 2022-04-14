import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/auth'

import Button from '../component/Button'
import Input from '../component/Input'

const Login: React.FC = () => {
  // state
  const navigate = useNavigate()

  // context
  const { dispatch } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: ''
    },
    onSubmit: () => {}
  })

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const login = await axios.post('/member/login', formik.values, {
      withCredentials: true
    })
    if (login.status === 200) {
      dispatch({ type: 'authenticated' })
      navigate('/')
    }
  }

  return (
    <form
      method='POST'
      onSubmit={login}
      className='bg-white border px-8 py-5 w-[350px] rounded-xl shadow-lg mx-auto mt-40'>
      <h1 className='text-3xl font-bold text-center mb-5'>লগইন</h1>
      <div className=''>
        <Input
          placeholder='মোবাইল'
          name='phone'
          value={formik.values.phone}
          onChange={formik.handleChange}
        />

        <Input
          type='password'
          placeholder='পাসওয়ার্ড'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <p className='mb-3 text-orange-500'>
          <Link to='/changepass'>পাসওয়ার্ড ভুলে গেছেন?</Link>
        </p>
      </div>
      <Button type='submit'>লগইন করুন</Button>
      <p className='text-orange-500 text-center mt-2'>
        <Link to='/signup'>অ্যাকাউন্ট তৈরি করুন</Link>
      </p>
    </form>
  )
}

export default Login

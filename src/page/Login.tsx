import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import toast from 'react-hot-toast'

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
    validationSchema: Yup.object({
      phone: Yup.string()
        .min(11, 'মোবাইল নম্বর সঠিক নয়')
        .max(11, 'মোবাইল নম্বর ১১ সংখ্যার বেশী হবেনা')
        .required('মোবাইল নম্বর দিন'),
      password: Yup.string().required('পাসওয়ার্ড দিন')
    }),
    onSubmit: async () => {
      try {
        const { data, status } = await axios.post('/member/login', formik.values, {
          withCredentials: true
        })

        if (status === 200) {
          dispatch({
            type: 'authenticated',
            payload: data
          })
          toast.success('লগ ইন সম্পন্ন হয়েছে')
          navigate('/')
        }
      } catch (error) {
        toast.error('ফোন নং অথবা পাসওয়ার্ড ভুল দিয়েছেন')
      }
    }
  })

  return (
    <form
      method='POST'
      onSubmit={formik.handleSubmit}
      className='bg-white border px-8 py-5 w-[350px] rounded-xl shadow-lg mx-auto mt-40'
    >
      <h1 className='text-3xl font-bold text-center mb-5'>লগইন</h1>
      <div className=''>
        <Input
          placeholder='মোবাইল'
          name='phone'
          autoComplete={false}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone ? formik.errors.phone : undefined}
        />

        <Input
          type='password'
          placeholder='পাসওয়ার্ড'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password ? formik.errors.password : undefined}
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

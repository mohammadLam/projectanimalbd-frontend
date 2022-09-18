import axios from 'axios'
import React, { useContext } from 'react'
import { useFormik } from 'formik'
import Input from '../component/Input'
import Select from '../component/Select'
import Button from '../component/Button'
import * as Yup from 'yup'

import { AuthContext } from '../context/auth'
import toast from 'react-hot-toast'

const Signup: React.FC = () => {
  const { dispatch } = useContext(AuthContext)
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '18',
      phone: '',
      address: '',
      password: '',
      repass: '',
      gender: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('নাম লিখুন').min(3).max(20),
      age: Yup.number().min(13).required('বয়স লিখুন'),
      gender: Yup.mixed().oneOf(['male', 'female', 'other']).required('লিঙ্গ নির্বাচন করুন'),
      address: Yup.string().required('ঠিকানা লিখুন'),
      password: Yup.string()
        .min(8, 'পাসওয়ার্ড অবশ্যই ৮ সংখ্যার বেশী হতে হবে')
        .required('পাসওয়ার্ড লিখুন'),
      repass: Yup.ref('password'),
      phone: Yup.string()
        .required('ফোন নং লিখুন')
        .matches(/^(?:\+?88|0088)?01[15-9]\d{8}$/, 'ফোন নং সঠিক নয়')
    }),
    onSubmit: async values => {
      const createAccount = await axios.post('/member/signup', values, {
        withCredentials: true
      })
      if (createAccount.status === 200) {
        toast.success('অ্যাকাউন্ট তৈরি হয়েছে')
        dispatch({
          type: 'authenticated',
          payload: createAccount.data
        })
      }
    }
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='bg-white border px-8 py-5 w-full sm:w-[650px] md:w-[700px] rounded-xl shadow-lg mt-10 mx-auto lg:mt-40'
    >
      <h1 className='text-3xl font-semibold text-center mb-5'>সাইন আপ</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'>
        <Input
          placeholder='নাম'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name ? formik.errors.name : undefined}
        />
        <Input
          placeholder='মোবাইল'
          name='phone'
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone ? formik.errors.phone : undefined}
        />
        <Input
          type='number'
          placeholder='বয়স'
          name='age'
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.age ? formik.errors.age : undefined}
        />
        <Select
          placeholder='লিঙ্গ'
          value={formik.values.gender}
          name='gender'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.gender ? formik.errors.gender : undefined}
        >
          {[
            {
              value: '',
              text: 'লিঙ্গ নির্বাচন করুন'
            },
            {
              value: 'male',
              text: 'পুরুষ'
            },
            {
              value: 'female',
              text: 'মহিলা'
            },
            {
              value: 'other',
              text: 'অন্যান্য'
            }
          ]}
        </Select>
        <div className='col-span-full'>
          <Input
            placeholder='ঠিকানা'
            name='address'
            hint='এলাকার নাম, উপজেলা, জেলা'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address ? formik.errors.address : undefined}
          />
        </div>

        <Input
          type='password'
          placeholder='পাসওয়ার্ড'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <Input
          type='password'
          placeholder='পুনরায় পাসওয়ার্ড'
          name='repass'
          value={formik.values.repass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.repass ? formik.errors.repass : undefined}
        />
      </div>
      <Button type='submit'>অ্যাকাউন্ট তৈরি করুন</Button>
    </form>
  )
}

export default Signup

import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import Input from '../component/Input'
import Select from '../component/Select'
import Button from '../component/Button'

const Signup: React.FC = () => {
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
    onSubmit: () => {}
  })

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formik.values)

    const createAccount = await axios.post('/member/signup', formik.values)
    if (createAccount.status === 200) {
      console.log(createAccount.data)
    }
  }

  return (
    <form
      onSubmit={signup}
      className='bg-white border px-8 py-5 w-[350px] sm:w-[650px] md:w-[700px] rounded-xl shadow-lg mx-auto mt-40'>
      <h1 className='text-3xl font-semibold text-center mb-5'>সাইন আপ</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'>
        <Input
          placeholder='নাম'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <Input
          placeholder='মোবাইল'
          name='phone'
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <Input
          type='number'
          placeholder='বয়স'
          name='age'
          value={formik.values.age}
          onChange={formik.handleChange}
        />
        <Select
          placeholder='লিঙ্গ'
          value={formik.values.gender}
          name='gender'
          onChange={formik.handleChange}>
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
        <Input
          placeholder='ঠিকানা'
          className='col-span-full'
          name='address'
          hint='এলাকার নাম, উপজেলা, জেলা'
          value={formik.values.address}
          onChange={formik.handleChange}
        />

        <Input
          type='password'
          placeholder='পাসওয়ার্ড'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Input
          type='password'
          placeholder='পুনরায় পাসওয়ার্ড'
          name='retypePassword'
          value={formik.values.repass}
          onChange={formik.handleChange}
        />
      </div>
      <Button type='submit'>অ্যাকাউন্ট তৈরি করুন</Button>
    </form>
  )
}

export default Signup

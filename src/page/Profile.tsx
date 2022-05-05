import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import toast from 'react-hot-toast'

import Input from '../component/Input'
import Select from '../component/Select'
import Button from '../component/Button'
import Heading from '../component/Heading'
import Container from '../component/Container'

const Profile: React.FC = () => {
  const profile = useFormik({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      phone: '',
      address: ''
    },
    onSubmit: async values => {
      try {
        const { status } = await axios.put('/member/profile', values, {
          withCredentials: true
        })

        if (status === 200) {
          toast.success('প্রোফাইল আপডেট হয়েছে')
        }
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    }
  })

  const password = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      rePassword: ''
    },
    onSubmit: async values => {
      const request = axios
        .put('/member/change-password', values, {
          withCredentials: true
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  })

  useEffect(() => {
    const profileInfo = async () => {
      const me = await axios.get('/member/me', {
        withCredentials: true
      })
      if (me.status === 200) {
        profile.setValues(me.data)
      }
    }

    profileInfo()
  }, [])
  return (
    <Container>
      <form
        onSubmit={profile.handleSubmit}
        className='bg-white border px-3 md:px-8 py-5 w-full md:w-[700px] rounded-xl shadow mx-auto mt-5 mb-5 md:mt-20'
      >
        <Heading>প্রোফাইলঃ</Heading>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'>
          <Input
            placeholder='নাম'
            name='name'
            value={profile.values.name}
            onChange={profile.handleChange}
          />
          <Input
            placeholder='মোবাইল'
            name='phone'
            value={profile.values.phone}
            onChange={profile.handleChange}
          />
          <Input
            type='number'
            placeholder='বয়স'
            name='age'
            value={profile.values.age}
            onChange={profile.handleChange}
          />
          <Select
            placeholder='লিঙ্গ'
            value={profile.values.gender}
            name='gender'
            onChange={profile.handleChange}
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
              value={profile.values.address}
              onChange={profile.handleChange}
            />
          </div>
        </div>

        <Button type='submit'>আপডেট করুন</Button>
      </form>

      <form
        onSubmit={password.handleSubmit}
        className='bg-white border px-3 md:px-8 py-5 w-full md:w-[700px] rounded-xl shadow mx-auto mb-5'
      >
        <Heading>পাসওয়ার্ড পরিবর্তন করুনঃ</Heading>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'>
          <div className='col-span-full'>
            <Input
              type='password'
              placeholder='বর্তমান পাসওয়ার্ড'
              name='oldPassword'
              value={password.values.oldPassword}
              onChange={password.handleChange}
            />
          </div>
          <Input
            type='password'
            placeholder='নতুন পাসওয়ার্ড'
            name='newPassword'
            value={password.values.newPassword}
            onChange={password.handleChange}
          />
          <Input
            type='password'
            placeholder='পাসওয়ার্ড আবার দিন'
            name='rePassword'
            value={password.values.rePassword}
            onChange={password.handleChange}
          />
        </div>
        <Button type='submit'>পরিবর্তন করুন</Button>
      </form>
    </Container>
  )
}

export default Profile

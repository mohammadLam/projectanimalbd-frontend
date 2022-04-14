import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import Input from '../component/Input'
import Select from '../component/Select'
import Button from '../component/Button'

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
      axios.put('/member/profile', profile.values)
    }
  })

  const password = useFormik({
    initialValues: {
      password: '',
      newPassword: ''
    },
    onSubmit: () => {}
  })

  useEffect(() => {
    const profileInfo = async () => {
      const me = await axios.get('/member/me', { withCredentials: true })
      if (me.status === 200) {
        profile.setValues(me.data)
      }
    }

    profileInfo()
  }, [])
  return (
    <div className='container mx-auto'>
      <form
        onSubmit={profile.handleSubmit}
        className='bg-white border px-8 py-5 w-[350px] sm:w-[650px] md:w-[700px] rounded-xl shadow-lg mx-auto mt-20'>
        <h1 className='text-3xl font-semibold mb-5'>প্রোফাইল</h1>
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
            onChange={profile.handleChange}>
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
            value={profile.values.address}
            onChange={profile.handleChange}
          />
        </div>
        <Button type='submit'>আপডেট করুন</Button>
      </form>

      <form
        onSubmit={profile.handleSubmit}
        className='bg-white border px-8 py-5 w-[350px] sm:w-[650px] md:w-[700px] rounded-xl shadow-lg mx-auto mt-10'>
        <h1 className='text-3xl font-semibold mb-5'>
          পাসওয়ার্ড পরিবর্তন করুনঃ
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'>
          <Input
            placeholder='বর্তমান পাসওয়ার্ড'
            name='name'
            value={password.values.password}
            onChange={password.handleChange}
          />
          <Input
            placeholder='নতুন পাসওয়ার্ড'
            name='phone'
            value={password.values.newPassword}
            onChange={password.handleChange}
          />
        </div>
        <Button type='submit'>পরিবর্তন করুন</Button>
      </form>
    </div>
  )
}

export default Profile

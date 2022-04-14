import { useFormik } from 'formik'
import React from 'react'
import Button from '../component/Button'
import Input from '../component/Input'

const ForgotPassword: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      phone: ''
    },

    onSubmit: () => {}
  })

  const changePassword = async () => {}

  return (
    <div>
      <form className='bg-white border px-8 py-5 w-[350px] rounded-xl shadow-lg mx-auto mt-40'>
        <Input placeholder='মোবাইল নং' />
        <Button onClick={changePassword}>পাসওয়ার্ড পরিবর্তন করুন</Button>
      </form>
    </div>
  )
}

export default ForgotPassword

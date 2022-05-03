import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../component/Button'
import Container from '../component/Container'
import Input from '../component/Input'

const ForgotPassword: React.FC = () => {
  const [showPasswordChangeComp, setShowPasswordChangeComp] = useState(false)
  const checkAnswer = useFormik({
    initialValues: {
      phone: '',
      resetPasswordString: ''
    },

    validationSchema: {},

    onSubmit: async values => {
      const { status } = await axios.post('member/checkpassword-ans', values)
      if(status === 404) toast.error('আইডি খুজেঁ পাওয়া যায়নি')
      console.log('We are here');
      
      if (status === 200) {
        setShowPasswordChangeComp(true)
        toast.success('আপনার উত্তর সঠিক হয়েছে')
      }
    }
  })

  const changePassword = useFormik({
    initialValues: {
      newPassword: '',
      rePassword: ''
    },
    onSubmit: async values => {
      try {
        const { status } = await axios.put('/member/change-forgotpassword', values)
        if (status === 400) toast.error('পুণরায় পাসওয়ার্ড ভুল লিখেছেন')
        if(status === 200 ) toast.success('পাসওয়ার্ড পরিবর্তন হয়েছে')
      } catch (error) {
        console.log(error)
      }
    }
  })


  return (
    <Container>
      <div className='bg-white border px-8 py-5 w-full lg:w-[350px] rounded-xl shadow-lg mx-auto mt-40'>
        <form onSubmit={checkAnswer.handleSubmit}>
          <Input placeholder='মোবাইল নং' name='phone' value={checkAnswer.values.phone} onChange={checkAnswer.handleChange} />
          <Input placeholder='উত্তর লিখুন' name='resetPasswordString' value={checkAnswer.values.resetPasswordString} onChange={checkAnswer.handleChange} />

          <Button type='submit'>যাচাই করুন</Button>
        </form>

        {showPasswordChangeComp && (
          <form className='mt-5' onSubmit={changePassword.handleSubmit}>
            <Input placeholder='নতুন পাসওয়ার্ড দিন' name='password' value={changePassword.values.newPassword} onChange={changePassword.handleChange} />
            <Input placeholder='পাসওয়ার্ডটি পুণরায় লিখুন' name='repass' value={changePassword.values.rePassword} onChange={changePassword.handleChange} />

            <Button type='submit'>পাসওয়ার্ড পরিবর্তন করুন</Button>
          </form>
        )}
      </div>
    </Container>
  )
}
export default ForgotPassword

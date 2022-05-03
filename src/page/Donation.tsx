import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { object, string, number } from 'yup'
import Button from '../component/Button'
import Container from '../component/Container'
import Heading from '../component/Heading'
import Input from '../component/Input'
import Textarea from '../component/Textarea'
import { AuthContext } from '../context/auth'

const Donation: React.FC = () => {
  const [isClickedOnCustom, _isClickedOnCustom] = useState(false)
  const { auth } = useContext(AuthContext)
  const donate = useFormik({
    initialValues: {
      name: '',
      amount: 100,
      comment: ''
    },
    validationSchema: object({
      name: string().max(20, 'নাম অবশ্যই ২০ অক্ষরের মধ্যে হতে হবে'),
      amount: number()
        .min(50, '৫০ টাকার নিচে সাহায্য পাঠাতে পারবেন না')
        .required('টাকার পরিমাণ উল্লেখ করুন')
    }),
    onSubmit: async values => {
      await axios.post('/donate', values, {
        withCredentials: true
      })
    }
  })

  const donateAmountList = [50, 100, 500, 1000, 5000, 10000, 0]

  return (
    <Container>
      <div className='mt-5'>
        <form
          onSubmit={donate.handleSubmit}
          className='w-full lg:w-max mx-auto px-5 py-3 bg-white shadow border rounded-lg'
        >
          <Heading>সাহায্য করুনঃ</Heading>
          <div>
            <p className='mb-1 text-sm font-normal text-gray-700'>অনুদানের পরিমাণ</p>
            <div className='flex flex-wrap justify-center mb-2 gap-2'>
              {donateAmountList.map(amount => (
                <button
                  key={amount}
                  type='button'
                  className='px-3 py-1 bg-white rounded-lg border'
                  onClick={() => {
                    donate.setValues({ ...donate.values, amount })
                    if (amount !== 0) _isClickedOnCustom(false)
                    if (amount === 0) _isClickedOnCustom(true)
                  }}
                >
                  <span className='text-sm lg:text-base font-normal'>
                    {amount === 0 ? 'Custom' : amount}
                  </span>
                </button>
              ))}
            </div>
            <Input
              type='number'
              disabled={!isClickedOnCustom}
              value={donate.values.amount}
              name='amount'
              onChange={donate.handleChange}
              onBlur={donate.handleBlur}
              error={donate.touched.amount ? donate.errors.amount : undefined}
            />
          </div>
          {'memberId' in auth ? null : (
            <Input
              placeholder='আপনার নাম'
              value={donate.values.name}
              name='name'
              onChange={donate.handleChange}
              onBlur={donate.handleBlur}
              error={donate.touched.name ? donate.errors.name : undefined}
            />
          )}
          <Textarea placeholder='কিছু লিখতে চান?' name='comment' onChange={donate.handleChange}>
            {donate.values.comment}
          </Textarea>

          <Button type='submit'>পাঠান</Button>
        </form>
      </div>
    </Container>
  )
}

export default Donation

import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { object, string, number } from 'yup'
import Button from '../component/Button'
import Container from '../component/Container'
import Heading from '../component/Heading'
import Input from '../component/Input'
import Textarea from '../component/Textarea'
import { AuthContext } from '../context/auth'

const Donation: React.FC = () => {
  const [isClickedOnCustom, setIsClickedOnCustom] = useState(false)
  const { auth } = useContext(AuthContext)

  const donate = useFormik({
    initialValues: {
      name: '',
      phone: '',
      amount: 100,
      description: '',
      isAuthenticated: auth.authenticated,
      memberId: 'memberId' in auth ? auth.memberId : ''
    },
    validationSchema: object({
      name: string().when('isAuthenticated', {
        is: false,
        then: string().required('নাম লিখুন').max(20, 'নাম অবশ্যই ২০ অক্ষরের মধ্যে হতে হবে')
      }),
      phone: string().when('isAuthenticated', {
        is: false,
        then: string().required('মোবাইল নং লিখুন')
      }),
      amount: number()
        .min(50, '৫০ টাকার নিচে সাহায্য পাঠাতে পারবেন না')
        .required('টাকার পরিমাণ উল্লেখ করুন')
    }),
    onSubmit: async values => {
      try {
        const { data, status } = await axios.post('/donate', values)

        if (status === 200) {
          window.location = data.redirectGatewayURL
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  const donateAmountList = [50, 100, 500, 1000, 5000, 10000, 0]

  useEffect(() => {
    donate.setValues({
      name: '',
      amount: 100,
      description: '',
      isAuthenticated: auth.authenticated,
      memberId: 'memberId' in auth ? auth.memberId : '',
      phone: ''
    })
  }, [auth.authenticated])

  return (
    <Container>
      <div className='my-5'>
        <div className='w-full lg:w-max mx-auto px-5 py-3 bg-white shadow border rounded-lg'>
          <form onSubmit={donate.handleSubmit}>
            <Heading>সাহায্য করুনঃ</Heading>
            <div>
              <p className='mb-1 text-sm font-normal text-gray-700'>
                অনুদানের পরিমাণ <span className='text-lg'>৳</span>
              </p>
              <div className='flex flex-wrap justify-center mb-2 gap-2'>
                {donateAmountList.map(amount => (
                  <button
                    key={amount}
                    type='button'
                    className='px-3 py-1 bg-white rounded-lg border'
                    onClick={() => {
                      donate.setValues({ ...donate.values, amount })
                      if (amount !== 0) setIsClickedOnCustom(false)
                      if (amount === 0) setIsClickedOnCustom(true)
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
            {!auth.authenticated && (
              <>
                <Input
                  placeholder='আপনার নাম (ইংরেজীতে)'
                  value={donate.values.name}
                  name='name'
                  onChange={donate.handleChange}
                  onBlur={donate.handleBlur}
                  error={donate.touched.name ? donate.errors.name : undefined}
                />

                <Input
                  placeholder='আপনার মোবাইল নং'
                  value={donate.values.phone}
                  name='phone'
                  onChange={donate.handleChange}
                  onBlur={donate.handleBlur}
                  error={donate.touched.phone ? donate.errors.phone : undefined}
                />
              </>
            )}
            <Textarea
              placeholder='কিছু লিখতে চান?'
              name='description'
              onChange={donate.handleChange}
            >
              {donate.values.description}
            </Textarea>

            <Button type='submit' disabled={donate.isSubmitting}>
              পাঠান
            </Button>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default Donation

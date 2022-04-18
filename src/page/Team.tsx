import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'

import Button from '../component/Button'
import Input from '../component/Input'
import Modal from '../component/Modal'

import { Team as TeamInterface } from '../interface/Team'

const Request: React.FC = () => {
  return (
    <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
      <div className='px-5 py-2 border-b bg-gray-50 leading-tight relative'>
        <button
          type='button'
          className='flex items-center justify-center bg-red-200 rounded-full w-6 h-6 absolute right-5 inset-y-0 my-auto'
        >
          <svg
            className='fill-red-500'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='14px'
            height='14px'
          >
            <path d='M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z' />
          </svg>
        </button>
        <p className='font-semibold text-xl'>সুমাইয়া আক্তার</p>
        <p>শেওড়াপাড়া, মিরপুর, ১০</p>
      </div>

      <div className='px-5 py-3'>
        <p className='text-gray-700 mb-3'>
          I’ve written a few thousand words on why traditional “semantic class
          names” are the reason CSS is hard to maintain, but the truth is you’re
          never going to believe me until you actually try it.
        </p>
        <div className='flex gap-x-1'>
          <button className='bg-green-500 text-white rounded px-3 py-1 text-sm'>
            সাহায্য করুন
          </button>
          {/* <button className='bg-red-500 text-white rounded px-3 py-1 text-sm'>
            এখন করবোনা
          </button> */}
        </div>
      </div>
    </div>
  )
}

const Member: React.FC = () => {
  return (
    <div className='px-5 py-2 rounded-lg border shadow-sm bg-white relative'>
      <button
        type='button'
        className='flex items-center justify-center bg-red-200 rounded-full w-5 h-5 absolute right-1 top-1'
      >
        <svg
          className='fill-red-500'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='12px'
          height='12px'
        >
          <path d='M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z' />
        </svg>
      </button>
      <p className='font-semibold text-xl'>ইয়ামিন রিয়াদ</p>
      <p>মিলনপুর, মিঠাপুকুর, রংপুর</p>
      <p>মোবাইলঃ 01821599796</p>
    </div>
  )
}

const Teamlist: React.FC = () => {
  const [teamlist, setTeamList] = useState<TeamInterface[]>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()

  const formik = useFormik({
    initialValues: {
      name: '',
      slogan: '',
      address: '',
      email: '',
      phone: '',
      link: ''
    },
    onSubmit: async values => {
      const { name, slogan, address, email, phone, link } = values
      const data = {
        name,
        slogan,
        address,
        email,
        contact: {
          phone,
          link,
          email
        },
        location: [latitude, longitude]
      }
      try {
        const createTeam = await axios.post('/team', data, {
          withCredentials: true
        })
        if (createTeam.status === 200) {
          setTeamList(prev => prev?.concat(createTeam.data))
          setIsModalOpen(false)
        } else {
          console.log(createTeam)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  // modal function
  const openModal = () => setIsModalOpen(true)
  const hideModal = () => setIsModalOpen(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })

    const fetchMember = async () => {
      const response = await axios.get('/team/members', {
        withCredentials: true
      })
      if (response.status === 200) {
        setTeamList(response.data)
      }
    }

    fetchMember()
  }, [])

  return (
    <div className='container mx-auto px-5 md:px-0'>
      <div className='mt-5'>
        {/* <Button onClick={openModal}>টিম তৈরি করুন</Button> */}
        {/* <Button onClick={openModal}>সদস্য যোগ করুন</Button> */}

        <h1 className='text-3xl text-center font-bold mb-5'>
          সাহায্যের জন্য আবেদেন করেছেনঃ
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10'>
          <Request />
          <Request />
          <Request />
          <Request />
          <Request />
        </div>

        <h1 className='text-3xl font-bold text-center mb-5'>সদস্যের তালিকাঃ</h1>
        <div className='flex flex-wrap gap-3 mb-10 justify-center'>
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <div className='p-2 border shadow-sm bg-white rounded-lg'>
            <div className='flex flex-col items-center justify-center rounded-lg border-2 border-orange-500 border-dotted px-20 h-full cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                width='24'
                height='24'
                x='0'
                y='0'
                viewBox='0 0 512 512'
              >
                <g>
                  <g xmlns='http://www.w3.org/2000/svg'>
                    <g>
                      <path
                        d='M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216    v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z'
                        className='fill-orange-500'
                        data-original='#000000'
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <h1 className='text-3xl text-center font-bold mb-5'>
          টিম সংস্কার করুনঃ
        </h1>
      </div>

      <Modal
        headerText='টিম তৈরি করুন'
        isModalOpen={isModalOpen}
        openModalFunction={openModal}
        closeModalFunction={hideModal}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
            <Input
              placeholder='নাম'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Input
              placeholder='স্লোগান'
              name='slogan'
              value={formik.values.slogan}
              onChange={formik.handleChange}
            />
            <Input
              placeholder='ঠিকানা'
              name='address'
              hint='এলাকার নাম, পৌরসভা/ইউনিয়ন, উপজেলা, জেলা'
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <Input
              placeholder='মোবাইল'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            <Input
              placeholder='ফেসবুক লিংক'
              name='link'
              value={formik.values.link}
              onChange={formik.handleChange}
            />
            <Input
              placeholder='ইমেইল'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <Button type='submit'>তৈরি করুন</Button>
        </form>
      </Modal>
    </div>
  )
}

export default Teamlist

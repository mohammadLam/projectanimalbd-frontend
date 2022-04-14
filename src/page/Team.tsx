import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useFormik } from 'formik'

import Button from '../component/Button'
import Input from '../component/Input'
import Team from '../component/Team'

import { BasicTeam as TeamInterface } from '../interface/Team'

const Teamlist: React.FC = () => {
  const [teamlist, setTeamList] = useState<TeamInterface[]>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
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
        admin: '624ec2d4b58223cc49d8eb25',
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
          setModalIsOpen(false)
        } else {
          console.log(createTeam)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  // modal function
  const openModal = () => setModalIsOpen(true)
  const hideModal = () => setModalIsOpen(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })

    const fetchTeam = async () => {
      const response = await axios.get<TeamInterface[]>('/team', {
        withCredentials: true
      })
      if (response.status === 200) {
        setTeamList(response.data)
      }
    }

    fetchTeam()
  }, [])

  ReactModal.setAppElement('#modal')

  return (
    <div className='container mx-auto px-5 md:px-0'>
      <div className='mt-5'>
        <div className='w-[200px]'>
          <Button onClick={openModal}>টিম তৈরি করুন</Button>
        </div>

        {/* Team */}
        {teamlist ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-5 mt-5'>
            {teamlist.map(team => (
              <Team key={team._id} {...team} />
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <ReactModal
        closeTimeoutMS={500}
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }
        }}
        className='modal'
        onRequestClose={hideModal}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc>
        <form onSubmit={formik.handleSubmit}>
          <div className='header'>
            <h1 className='text-3xl font-medium'>টিম তৈরি করুন</h1>
            <button
              type='button'
              className='flex items-center justify-center bg-red-200 rounded-full w-8 h-8'
              onClick={hideModal}>
              <svg
                className='fill-red-500'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='18px'
                height='18px'>
                <path d='M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z' />
              </svg>
            </button>
          </div>
          <div className='content'>
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
              <div className='col-span-full'>
                <Input
                  placeholder='ঠিকানা'
                  name='address'
                  hint='এলাকার নাম, পৌরসভা/ইউনিয়ন, উপজেলা, জেলা'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>
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
          </div>
          <div className='footer'>
            <Button type='submit'>তৈরি করুন</Button>
          </div>
        </form>
      </ReactModal>
    </div>
  )
}

export default Teamlist

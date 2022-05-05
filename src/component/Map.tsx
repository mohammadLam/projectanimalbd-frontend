import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'

import { TeamContext } from '../context/team'
import Input from './Input'
import File from './File'

import Modal from './Modal'
import Textarea from './Textarea'
import Button from './Button'

const Map: React.FC = () => {
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // file related state
  const [photo, setPhoto] = useState<FileList>({} as FileList)
  const [howManyFile, setHowManyFile] = useState(0)

  // context
  const { teams } = useContext(TeamContext)

  const request = useFormik({
    initialValues: {
      teamId: '',
      address: '',
      description: '',
      photo
    },
    onSubmit: async values => {
      const formdata = new FormData()
      formdata.append('teamId', values.teamId)
      formdata.append('location', JSON.stringify([latitude, longitude]))
      formdata.append('address', values.address)
      formdata.append('description', values.description)

      for (let i = 0; i < photo.length; i++) {
        formdata.append('photo', photo[i])
      }

      const request = await axios.post('/request', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if (request.status === 200) {
        setIsModalOpen(false)
        toast.success('আপনার অনুরোধ পাঠানো হয়েছে')
      }
    }
  })

  const selectTeamForRequest = (teamId: string) => {
    request.setFieldValue('teamId', teamId)
    setIsModalOpen(true)
  }

  const photoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhoto(event.target.files)
      setHowManyFile(event.target.files.length)
    }
  }

  // modal function
  const openModal = () => setIsModalOpen(true)
  const hideModal = () => setIsModalOpen(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }, [])

  return (
    <>
      {latitude && longitude && (
        <MapContainer center={{ lat: latitude, lng: longitude }} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle center={[latitude, longitude]} radius={5000} />
          <Marker position={[latitude, longitude]}>
            <Popup>
              <h1 className='text-2xl font-medium'>আপনার লোকেশান</h1>
            </Popup>
          </Marker>

          {teams &&
            teams.map((team, index) => (
              <Marker position={[team.location[0], team.location[1]]} key={index}>
                <Popup className='w-80'>
                  <h2 className='text-2xl font-semibold'>{team.name}</h2>
                  <p className='text-base mb-1'>{team.address}</p>

                  <div className='flex flex-col mb-3'>
                    <h2 className='text-lg font-medium'>যোগাযোগঃ</h2>
                    <a className='text-base' href={`tel:${team.contact.phone}`}>
                      {team.contact.phone}
                    </a>
                    <a className='text-base' href={`mailto:${team.contact.email}`}>
                      {team.contact.email}
                    </a>
                  </div>

                  {/* <p className='text-base'>ফান্ড আছে {team.fund} টাকা</p> */}
                  <button
                    className='bg-green-600 px-3 py-1 rounded text-white'
                    onClick={() => selectTeamForRequest(team._id)}
                  >
                    রিকোয়েস্ট করুন
                  </button>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}

      <Modal
        headerText='রিকোয়েস্ট পাঠান'
        isModalOpen={isModalOpen}
        openModalFunction={openModal}
        closeModalFunction={hideModal}
      >
        <form onSubmit={request.handleSubmit}>
          <div className='grid grid-cols-1'>
            <Input
              placeholder='সাহায্যের ঠিকানা'
              hint='গ্রাম/পাড়া, ইউনিয়ন/পৌরসভা, উপজেলা, জেলা'
              name='address'
              value={request.values.address}
              onChange={request.handleChange}
            />
            <Textarea
              placeholder='বিস্তারিত লিখুন'
              name='description'
              value={request.values.description}
              onChange={request.handleChange}
            ></Textarea>
            <File
              onChange={photoChangeHandler}
              multiple={true}
              totalselectedfile={howManyFile}
              placeholder='ছবি আপলোড করুন'
              hint='সর্বোচ্চ ৩টি ছবি আপলোড করতে পারবেন'
            />
            <div>
              <Button>পাঠান</Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default Map

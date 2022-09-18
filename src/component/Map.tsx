import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  ScaleControl
} from 'react-leaflet'
import { icon } from 'leaflet'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'

//
import redicon from '../img/redicon.png'

import { TeamContext } from '../context/team'
import Input from './Input'
import File from './File'

import Modal from './Modal'
import Textarea from './Textarea'
import Button from './Button'
import { LocationContext } from '../context/location'

const Map: React.FC = () => {
  const { location } = useContext(LocationContext)
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
      formdata.append('location', JSON.stringify([location[0], location[1]]))
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

  let teamIcon = icon({
    iconUrl: redicon,
    iconRetinaUrl: redicon,
    iconSize: [45, 60],
    iconAnchor: [22, 50]
  })

  // modal function
  const openModal = () => setIsModalOpen(true)
  const hideModal = () => setIsModalOpen(false)

  useEffect(() => {}, [])

  return (
    <>
      {location[0] && location[1] ? (
        <MapContainer
          center={{ lat: location[1], lng: location[0] }}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle color='limegreen' center={[location[1], location[0]]} radius={40000} />
          <Marker position={[location[1], location[0]]}>
            <Popup>
              <h1 className='text-2xl font-medium'>আপনার লোকেশান</h1>
            </Popup>
          </Marker>

          <ScaleControl position='bottomright' />

          {teams &&
            teams.map((team, index) => (
              <div key={team._id}>
                <Marker
                  position={[team.location.coordinates[1], team.location.coordinates[0]]}
                  key={index}
                  icon={teamIcon}
                >
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

                <Polyline
                  color='green'
                  positions={[
                    { lat: location[1], lng: location[0] },
                    { lat: team.location.coordinates[1], lng: team.location.coordinates[0] }
                  ]}
                />
              </div>
            ))}
        </MapContainer>
      ) : undefined}

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

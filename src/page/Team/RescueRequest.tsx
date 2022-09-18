import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { parseJSON, intervalToDuration } from 'date-fns'

import Button from '../../component/Button'
import Modal from '../../component/Modal'
import { IRequest, RequestContext } from '../../context/Request'
import { LocationContext } from '../../context/location'

const RescueRequest: React.FC<{ request: IRequest }> = ({ request }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { requestsDispatch } = useContext(RequestContext)
  const { location } = useContext(LocationContext)

  const polylineCoords = [
    { lat: request.location.coordinates[1], lng: request.location.coordinates[0] },
    { lat: location[1], lng: location[0] }
  ]

  const openModal = () => setIsModalOpen(true)
  const hideModal = () => setIsModalOpen(false)

  const rejectRequest = async () => {
    const { status } = await axios.delete('request/' + request._id, {
      withCredentials: true
    })

    if (status === 200) {
      toast.success('অনুরোধ প্রত্যাখ্যান করা হয়েছে')
      requestsDispatch({
        type: 'reject',
        id: request._id
      })
    }
  }

  const { member, address, description, photos, createdAt } = request
  const duration = intervalToDuration({
    start: parseJSON(createdAt),
    end: new Date()
  })

  const photoUrl =
    axios.defaults.baseURL && axios.defaults.baseURL.slice(0, axios.defaults.baseURL.length - 4)

  return (
    <>
      <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
        <div className='px-5 py-2 border-b bg-zinc-100 leading-tight relative'>
          {request.status !== 'reject' && (
            <button
              type='button'
              className='flex items-center justify-center bg-red-200 rounded-full w-6 h-6 absolute right-5 inset-y-0 my-auto'
              onClick={rejectRequest}
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
          )}
          <p className='font-semibold text-xl'>{member.name}</p>
          <p>{address}</p>
        </div>

        <div className='px-5 py-3'>
          <p className='text-gray-700 mb-3'>{description}</p>
          <div className='flex mb-3'>
            <img className={`w-full`} src={`${photoUrl}/${photos[0]}`} alt='rescue' />
          </div>
          <Button onClick={() => openModal()}>ম্যাপে দেখুন</Button>
        </div>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModalFunction={hideModal}
        openModalFunction={openModal}
        headerText='রিকোয়েষ্টের তথ্যঃ'
      >
        <MapContainer
          className='request'
          center={{ lat: request.location.coordinates[1], lng: request.location.coordinates[0] }}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={[request.location.coordinates[1], request.location.coordinates[0]]}>
            <Popup>
              <h1 className='text-2xl font-medium'>গন্তব্য স্থান</h1>
            </Popup>
          </Marker>

          <Marker position={[location[1], location[0]]}>
            <Popup>
              <h1 className='text-2xl font-medium'>আপনার লোকেশান</h1>
            </Popup>
          </Marker>

          <Polyline color='orange' positions={polylineCoords} />
        </MapContainer>
        <p className='py-2 px-5 bg-yellow-100 text-yellow-600 mb-3'>{request.address}</p>
        <p className='mb-3'>{description}</p>
        {duration.days === 0 && duration.hours && duration.hours < 2 ? (
          <Button>সাহায্য করুন</Button>
        ) : undefined}
      </Modal>
    </>
  )
}

export default RescueRequest

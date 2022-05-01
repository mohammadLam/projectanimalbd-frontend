import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Heading from '../component/Heading'

export interface IRequest {
  _id: string
  team: {
    _id: string
    name: string
  }
  location: number[]
  address: string
  photos: string[]
  description: string
  createdAt: string
}

const Request: React.FC = () => {
  const [yourRequests, setYourRequests] = useState<IRequest[]>()

  const photoUrl =
    axios.defaults.baseURL && axios.defaults.baseURL.slice(0, axios.defaults.baseURL.length - 4)

  useEffect(() => {
    const fetchYourRequests = async () => {
      const { data, status } = await axios.get('/request/my', {
        withCredentials: true
      })

      if (status === 200) {
        setYourRequests(data)
      }
    }

    fetchYourRequests()
  }, [])

  return (
    <div className='container mx-auto px-3 lg:px-0 mt-5'>
      <Heading>আপনার রিকোয়েষ্ট হিস্টোরিঃ</Heading>

      {yourRequests && yourRequests.length > 0 ? (
        <div>
          {yourRequests.map(request => (
            <div
              key={request._id}
              className='w-full flex flex-col lg:flex-row bg-white mb-3 border rounded-xl shadow-lg overflow-hidden'
            >
              <div>
                <img
                  className='w-full lg:w-60 h-full object-cover'
                  src={`${photoUrl}/${request.photos[0]}`}
                  alt='request photo'
                />
              </div>
              <div className='px-5 py-2 flex flex-col justify-between'>
                <h1 className='text-2xl font-medium'>{request.team.name}</h1>
                <p>{request.description}</p>
                <p>{request.address}</p>
                <p className='text-lg text-gray-800 font-medium'>
                  তারিখঃ&nbsp;
                  {new Date(request.createdAt).toLocaleDateString('bn-BD')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>আপনি কোন রিকোয়েস্টই করেননি</h1>
      )}
    </div>
  )
}

export default Request

import axios from 'axios'
import React, {useContext} from 'react'
import toast from 'react-hot-toast'
import { IRequest,RequestContext } from '../../context/Request'

const RescueRequest: React.FC<{ request: IRequest }> = ({ request }) => {
  const {requestsDispatch} = useContext(RequestContext)

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

  const { member, address, description, photos } = request
  const photoUrl =
    axios.defaults.baseURL && axios.defaults.baseURL.slice(0, axios.defaults.baseURL.length - 4)

  return (
    <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
      <div className='px-5 py-2 border-b bg-gray-50 leading-tight relative'>
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
        <div className='flex gap-x-1'>
          <button className='bg-green-500 text-white rounded px-3 py-1 text-sm'>
            সাহায্য করুন
          </button>
        </div>
      </div>
    </div>
  )
}

export default RescueRequest

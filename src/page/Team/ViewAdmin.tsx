import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import QRCode from 'qrcode'
import Member from './Member'
import RescueRequest from './RescueRequest'
import { AuthContext } from '../../context/auth'
import toast from 'react-hot-toast'

export interface IMember {
  _id: string
  name: string
  address: string
  phone: string
}

export interface IRequest {
  _id: string
  member: {
    name: string
    phone: string
  }
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

interface ITeamInfo {
  contact: Contact
  _id: string
  admin: Admin
  name: string
  location: number[]
  address: string
  members: string[]
  fund: number
  createdAt: string
}

interface Admin {
  _id: string
  name: string
  address: string
  phone: string
}

interface Contact {
  phone: string
  email: string
  link: string
}

const ViewAdmin: React.FC = () => {
  const [memberList, setTeamList] = useState<IMember[]>()
  const [requests, setRequests] = useState<IRequest[]>()
  const [teamInfo, setTeamInfo] = useState<ITeamInfo>()
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    const canvas = document.getElementById('canvas')

    const fetchMember = async () => {
      const response = await axios.get('/team/myteam-members', {
        withCredentials: true
      })
      if (response.status === 200) {
        setTeamList(response.data)
      }
    }

    const fetchRequest = async () => {
      const { data, status } = await axios.get('/request', {
        withCredentials: true
      })

      if (status === 200) {
        setRequests(data)
      }
    }

    const fetchTeamInfo = async () => {
      const { data, status } = await axios.get<ITeamInfo>('/team/my', {
        withCredentials: true
      })

      if (status === 200) {
        QRCode.toCanvas(
          canvas,
          `${axios.defaults.baseURL}/join?team=${data._id}`,
          function (error) {
            if (error) toast.error('QR Code জেনারেট করা যায়নি')
          }
        )
        setTeamInfo(data)
      }
    }

    if ('team' in auth) {
      fetchMember()
      fetchRequest()
      fetchTeamInfo()
    }
  }, [])

  return (
    <div className='container mx-auto px-5 md:px-0'>
      <div className='mt-5'>
        <div className='bg-white px-7 py-4 rounded-lg shadow mb-3 w-full lg:w-max mx-auto flex-col lg:flex justify-between items-center gap-x-20'>
          <div>
            <h1 className='text-2xl font-bold'>দলের তথ্যঃ</h1>
            <p className='font-medium text-gray-700'>দলের নামঃ {teamInfo?.name}</p>
            <p className='font-medium text-gray-700'>মোট সদস্যঃ {teamInfo?.members.length}</p>
            <p className='font-medium text-gray-700'>দলের অবস্থানঃ {teamInfo?.address}</p>
            <p className='font-medium text-gray-700'>যোগাযোগঃ {teamInfo?.contact.phone}</p>
          </div>
          <div className='flex flex-col items-center'>
            <canvas id='canvas'></canvas>
            <p className='text-center'>
              QRCode স্ক্যান করে দলে <br /> যোগ দিতে পারবেন
            </p>
          </div>
        </div>

        <h1 className='text-3xl text-center font-bold mb-5'>সাহায্যের জন্য আবেদেন করেছেনঃ</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-3 mb-10'>
          {requests &&
            requests.map(request => <RescueRequest request={request} key={request._id} />)}
        </div>

        <h1 className='text-3xl font-bold text-center mb-5'>সদস্যের তালিকাঃ</h1>
        <div className='flex flex-wrap gap-3 mb-10 justify-center'>
          {memberList && memberList.map(member => <Member member={member} key={member._id} />)}
        </div>

        {/* <h1 className='text-3xl text-center font-bold mb-5'>
          টিম সংস্কার করুনঃ
        </h1> */}
      </div>
    </div>
  )
}

export default ViewAdmin

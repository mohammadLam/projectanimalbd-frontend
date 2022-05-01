import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import QRCode from 'qrcode'
import Member from './Member'
import RescueRequest from './RescueRequest'
import { AuthContext } from '../../context/auth'
import toast from 'react-hot-toast'
import Heading from '../../component/Heading'

import { enToBn } from '../../function/en-bn'
import { Tab } from '@headlessui/react'

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
  status: 'pending' | 'done' | 'reject'
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
      const { data, status } = await axios.get('/request/team', {
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
        setTeamInfo(data)
        QRCode.toCanvas(
          document.getElementById('canvas'),
          `${axios.defaults.baseURL}/join?teamId=${data._id}`,
          function (error) {
            if (error) toast.error('QR Code জেনারেট করা যায়নি')
          }
        )
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
        {teamInfo && (
          <div className='py-5 mb-10 bg-white border-b-2 border-gray-200 flex mx-auto lg:flex justify-center items-center gap-x-20'>
            <div>
              <Heading>দলের তথ্যঃ</Heading>
              <p>দলের নামঃ {teamInfo.name}</p>
              <p>মোট সদস্যঃ {enToBn(teamInfo.members.length)} জন</p>
              <p>দলের অবস্থানঃ {teamInfo.address}</p>
              <p>যোগাযোগঃ {teamInfo.contact.phone}</p>
            </div>
            <div className='flex flex-col items-center'>
              <canvas id='canvas'></canvas>
              <p className='text-center leading-tight'>
                QRCode স্ক্যান করে দলে <br /> যোগ দিতে পারবেন
              </p>
            </div>
          </div>
        )}

        <div className='border-b-2 border-gray-200 pb-10 mb-10'>
          <Heading align='center'>সাহায্যের জন্য আবেদেন করেছেনঃ</Heading>

          <Tab.Group defaultIndex={2}>
            <Tab.List className='mx-auto w-max bg-white rounded overflow-hidden border mb-3'>
              <Tab
                className={({ selected }) =>
                  `px-5 py-2 ${
                    selected ? 'bg-gray-200 text-gray-600 font-normal' : 'text-yellow-800'
                  }`
                }
              >
                সবগুলো
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-5 py-2 ${
                    selected ? 'bg-gray-200 text-gray-600 font-normal' : 'text-yellow-800'
                  }`
                }
              >
                পেন্ডিং
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-5 py-2 ${
                    selected ? 'bg-gray-200 text-gray-600 font-normal' : 'text-yellow-800'
                  }`
                }
              >
                রিজেক্ট
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-3'>
                  {requests &&
                    requests.map(request => <RescueRequest request={request} key={request._id} />)}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-3'>
                  {requests &&
                    requests.map(
                      request =>
                        request.status === 'pending' && (
                          <RescueRequest request={request} key={request._id} />
                        )
                    )}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-3'>
                  {requests &&
                    requests.map(
                      request =>
                        request.status === 'reject' && (
                          <RescueRequest request={request} key={request._id} />
                        )
                    )}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <div className='mb-10'>
          <Heading align='center'>সদস্যের তালিকাঃ</Heading>
          <div className='flex flex-wrap gap-3 mb-10 justify-center'>
            {memberList && memberList.map(member => <Member member={member} key={member._id} />)}
          </div>
        </div>

        {/* <h1 className='text-3xl text-center font-bold mb-5'>
          টিম সংস্কার করুনঃ
        </h1> */}
      </div>
    </div>
  )
}

export default ViewAdmin

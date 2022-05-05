import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../component/Container'
import { enToBn } from '../function/en-bn'

interface IDonationInfo {
  _id: string
  amount: number
  transactionId: string
  createdAt: string
}

const DonateSuccess: React.FC = () => {
  const [donationInfo, setDonationInfo] = useState<IDonationInfo>()
  const params = useParams()

  useEffect(() => {
    if(!params.incomeId) useNavigate()('/')

    const getDonateInfo =async () => {
      const { status, data } = await axios.get<IDonationInfo>(`/donate/${params.incomeId}`)
      
      if (status === 200) {
        toast.success('Donation Success')
        setDonationInfo(data)
      }
    }
    getDonateInfo()
  }, [])
  // #83D073
  return (
    <Container>
      {donationInfo && <div className='my-5 lg:mt-10 shadow border w-full lg:w-[600px] bg-white py-5 px-8 rounded-xl mx-auto'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-[#83d073] text-3xl font-semibold mb-3'>ধন্যবাদ</h1>
          <svg className='mb-3' xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="100" height="100" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="m369.164062 174.769531c7.8125 7.8125 7.8125 20.476563 0 28.285157l-134.171874 134.175781c-7.8125 7.808593-20.472657 7.808593-28.285157 0l-63.871093-63.875c-7.8125-7.808594-7.8125-20.472657 0-28.28125 7.808593-7.8125 20.472656-7.8125 28.28125 0l49.730468 49.730469 120.03125-120.035157c7.8125-7.808593 20.476563-7.808593 28.285156 0zm142.835938 81.230469c0 141.503906-114.515625 256-256 256-141.503906 0-256-114.515625-256-256 0-141.503906 114.515625-256 256-256 141.503906 0 256 114.515625 256 256zm-40 0c0-119.394531-96.621094-216-216-216-119.394531 0-216 96.621094-216 216 0 119.394531 96.621094 216 216 216 119.394531 0 216-96.621094 216-216zm0 0" fill="#83d073" data-original="#000000"></path></g></svg>
        </div>
        <h1 className='text-3xl mb-3 text-center font-semibold'>{enToBn(donationInfo.amount)} টাকা</h1>
        <p className='text-sm md:text-base lg:text-lg text-center' title='ট্র্যাঞ্জেকশান আইডি'>{donationInfo.transactionId.toUpperCase()}</p>
        <p className='text-lg text-center'>ট্র্যাঞ্জেকশানের তারিখঃ {new Date(donationInfo.createdAt).toLocaleDateString('bn-BD')}</p>
      </div>
      }
    </Container>
  )
}

export default DonateSuccess
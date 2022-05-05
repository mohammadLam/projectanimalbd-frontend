import axios from 'axios'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/auth'
import { IMember, MemberContext } from '../../context/member'

const Member: React.FC<{ member: IMember }> = ({ member }) => {
  const { address, name, phone } = member
  const { membersDispatch } = useContext(MemberContext)
  const { auth } = useContext(AuthContext)

  const removeMember = async () => {
    const { status } = await axios.delete('/team/removeMember', {
      withCredentials: true,
      data: {
        memberId: member._id
      }
    })

    if (status === 200) {
      membersDispatch({
        type: 'remove',
        id: member._id
      })
      toast.success('Member deleted')
    } else {
      toast.error('')
    }
  }

  if ('team' in auth) {
    
  }

  return (
    <div className='px-5 py-2 rounded-lg border shadow-sm bg-white relative'>
      
      {'team' in auth && auth.team?.isTeamAdmin && 'memberId' in auth && auth.memberId !== member._id && <button
        type='button'
        className='flex items-center justify-center bg-red-200 rounded-full w-5 h-5 absolute right-1 top-1'
        onClick={removeMember}
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
      </button>}
      <p className='font-semibold text-xl'>{name}</p>
      <p>{address}</p>
      <p>মোবাইলঃ {phone}</p>
    </div>
  )
}

export default Member

import React from 'react'
import { Team as TeamInterface } from '../interface/Team'

const Team: React.FC<TeamInterface> = ({
  name,
  address,
  location,
  contact,
  admin
}) => {
  return (
    <div className='px-6 py-3 bg-white placeholder:bg-gray-100 shadow border rounded-xl'>
      <h1 className='font-semibold text-2xl'>{name}</h1>
      <p className='font-medium mb-2'>{address}</p>
      <p>{admin.name}</p>
      <a href={`tel:${contact.phone}`} className='text-blue-500'>
        {contact.phone}
      </a>
    </div>
  )
}

export default Team

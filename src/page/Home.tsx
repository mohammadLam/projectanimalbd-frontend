import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Map from '../component/Map'
import { Team } from '../interface/Team'
import { TeamContext } from '../context/team'
import { LocationContext } from '../context/location'

const Home: React.FC = () => {
  // context
  const { teams, dispatch } = useContext(TeamContext)
  const { location } = useContext(LocationContext)

  // state
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await axios.post<Team[]>(
        '/team/under/5',
        {
          location: location
        },
        {
          withCredentials: true
        }
      )
      if (response.status === 200) {
        dispatch({ type: 'store', payload: response.data })
      }
    }

    // যদি লোকেশান থাকে তাহলে সার্ভারে Request করবে
    if (location[0] !== 0 && location[1] !== 0) fetchTeam()
  }, [location])

  return (
    <div className='relative'>
      <div className='flex'>
        {/* Sidebar */}
        <div
          className={`${
            sidebarIsOpen ? 'w-full md:w-1/5' : 'w-0'
          } shadow-xl bg-gray-50 transition-all duration-200`}>
          {teams &&
            teams.map((team, index) => (
              <div
                key={index}
                className='px-5 py-3 border-b bg-white hover:bg-gray-100 transition-colors cursor-pointer'>
                <h1 className='text-xl lg:text-2xl font-semibold'>
                  {team.name}
                </h1>
                <p>{team.address}</p>
                <a className='text-blue-600' href={`tel:${team.contact.phone}`}>
                  {team.contact.phone}
                </a>
              </div>
            ))}
        </div>

        {/* Map div */}
        <div className={`${sidebarIsOpen ? 'w-4/5' : 'w-full'} z-0`}>
          <Map />
        </div>
      </div>

      {/* সাইডবার show/hide এর বাটন */}
      <button
        className='absolute bottom-5 left-5 w-12 h-12 rounded-full z-20 bg-white shadow-xl flex justify-center items-center'
        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
        <svg
          className='fill-gray-500'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 30 30'
          width='30px'
          height='30px'>
          <path d='M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z' />
        </svg>
      </button>
    </div>
  )
}

export default Home

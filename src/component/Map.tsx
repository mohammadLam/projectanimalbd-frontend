import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { TeamContext } from '../context/team'

const Map: React.FC = () => {
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()

  // context
  const { teams } = useContext(TeamContext)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }, [])

  return (
    <>
      {latitude && longitude && (
        <MapContainer
          center={{ lat: latitude, lng: longitude }}
          zoom={15}
          scrollWheelZoom={true}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle center={[latitude, longitude]} radius={5000} />

          {teams &&
            teams.map((team, index) => (
              <Marker
                position={[team.location[0], team.location[1]]}
                key={index}>
                <Popup className='w-96'>
                  <h2 className='text-2xl font-semibold'>{team.name}</h2>
                  <p className='text-lg mb-3'>{team.address}</p>

                  <div className='flex flex-col mb-3'>
                    <h2 className='text-lg font-medium'>যোগাযোগঃ</h2>
                    <a className='text-base' href={`tel:${team.contact.phone}`}>
                      {team.contact.phone}
                    </a>
                    <a
                      className='text-base'
                      href={`mailto:${team.contact.email}`}>
                      {team.contact.email}
                    </a>
                  </div>

                  <p className='text-base'>ফান্ড আছেঃ {team.fund} টাকা</p>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </>
  )
}

export default Map

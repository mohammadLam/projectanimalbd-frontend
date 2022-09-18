import React from 'react'
import Leaflet from 'leaflet'
import redicon from '../img/redicon.png'

const TeamIcon = () => {
  let loveIcon = Leaflet.icon({
    iconUrl: redicon,
    iconRetinaUrl: redicon
  })

  return <div>TeamIcon</div>
}

export default TeamIcon

import React from 'react'

interface Props {
  children: string
}

const Heading: React.FC<Props> = ({ children }) => {
  return <h1 className='text-xl lg:text-3xl text-center font-bold mb-5'>{children}</h1>
}

export default Heading

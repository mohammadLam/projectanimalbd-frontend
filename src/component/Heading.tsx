import React from 'react'

interface Props {
  children: string
  align?: 'center' | 'left' | 'right'
}

const Heading: React.FC<Props> = ({ children, align }) => {
  if (align === 'center')
    return <h1 className='text-xl lg:text-3xl text-center font-semibold mb-5'>{children}</h1>

  if (align === 'right')
    return <h1 className='text-xl lg:text-3xl text-right font-semibold mb-5'>{children}</h1>

  return <h1 className='text-xl lg:text-3xl font-semibold mb-5'>{children}</h1>
}

export default Heading

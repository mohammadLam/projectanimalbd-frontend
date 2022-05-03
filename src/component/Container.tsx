import React, { ReactChildren, ReactElement, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

const Container: React.FC<Props> = ({ children, className }) => {
  if (className)
    return <div className={`${className} container mx-auto px-3 lg:px-20`}>{children}</div>

  return <div className='container mx-auto px-3 lg:px-20'>{children}</div>
}

export default Container

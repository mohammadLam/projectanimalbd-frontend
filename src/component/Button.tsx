import React from 'react'

interface Props {
  children: string
  round?: 'full' | 'medium' | 'none'
  type?: 'submit' | 'button'
  onClick?: (
    event:
      | React.FormEventHandler<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

const Button: React.FC<Props> = props => {
  return (
    <button {...props} className='primary-btn'>
      {props.children}
    </button>
  )
}

export default Button

import React from 'react'

interface Props {
  children: string
  type?: 'submit' | 'button'
  widthFull?: boolean
  onClick?: (
    event:
      | React.FormEventHandler<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

const Button: React.FC<Props> = props => {
  return (
    <button
      {...props}
      className={`primary-btn ${props.widthFull ? 'w-full' : ''}`}>
      {props.children}
    </button>
  )
}

export default Button

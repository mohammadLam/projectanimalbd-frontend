import React from 'react'

interface Props {
  value?: string
  type?: 'text' | 'number' | 'password'
  name?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  hint?: string
}

const Input: React.FC<Props> = props => {
  const { placeholder, type, hint } = props
  return (
    <div className='form-group'>
      <label>{placeholder}</label>
      <input {...props} type={type || 'text'} placeholder={hint || ''} />
    </div>
  )
}

export default Input

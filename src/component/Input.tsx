import React from 'react'

interface Props {
  value?: string
  type?: 'text' | 'number' | 'password'
  name?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  hint?: string
  error?: string
}

const Input: React.FC<Props> = props => {
  const { placeholder, type, hint, error } = props
  return (
    <div className={`form-group ${error && 'error'}`}>
      <label>{placeholder}</label>
      <input {...props} type={type || 'text'} placeholder={hint || ''} />
      {error && <span className='text-red-500 text-sm'>{error}</span>}
    </div>
  )
}

export default Input

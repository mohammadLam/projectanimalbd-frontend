import React from 'react'

interface Props {
  placeholder?: string
  children: {
    value: string | number
    text: string
  }[]
  value?: string
  name?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  onBlur?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
  disabled?: boolean
}

const Select: React.FC<Props> = props => {
  const { placeholder, children, value,error } = props

  return (
    <div className={`form-group${error ? ' error': ''}`}>
      <label>{placeholder}</label>
      <select {...props} value={value}>
        {children.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error && <span className='text-red-500 text-sm mt-1'>{error}</span>}
    </div>
  )
}

export default Select

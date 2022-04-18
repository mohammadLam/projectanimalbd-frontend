import React from 'react'

interface Props {
  placeholder: string
  children: {
    value: string | number
    text: string
  }[]
  value?: string
  name?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

const Select: React.FC<Props> = props => {
  const { placeholder, children, value } = props

  return (
    <div className='form-group'>
      <label>{placeholder}</label>
      <select {...props} value={value}>
        {children.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select

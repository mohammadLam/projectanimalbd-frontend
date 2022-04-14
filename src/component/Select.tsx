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
    <div className='flex flex-col mb-3'>
      <label htmlFor='' className='font-medium text-gray-600 ml-1 mb-1'>
        {placeholder}
      </label>
      <select
        {...props}
        value={value}
        className='border px-3 py-[0.4rem] outline-none bg-white appearance-none text-gray-900 border-[#E7E7E7] focus:border-[#0084FF]'>
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

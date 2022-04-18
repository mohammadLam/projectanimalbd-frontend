import React, { useRef } from 'react'

interface Props {
  placeholder?: string
  hint?: string
  multiple?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  totalselectedfile?: number
}

const File: React.FC<Props> = props => {
  const { placeholder, hint } = props

  const fileElement = useRef<HTMLInputElement>(null)

  const totalFile = props.totalselectedfile || 0

  return (
    <div className='form-group'>
      <label>{placeholder}</label>
      <input
        multiple={props.multiple === true ? true : false}
        className='hidden'
        type='file'
        {...props}
        placeholder={hint || ''}
        ref={fileElement}
      />

      <div
        className='file flex items-center justify-between gap-x-3'
        onClick={() => fileElement.current?.click()}>
        <div className='browse_button'>ফাইল সিলেক্ট করুন</div>
        <div className='text-gray-400 flex-1'>
          {totalFile === 0 ? hint : `${totalFile} file selected`}
        </div>
      </div>
    </div>
  )
}

export default File

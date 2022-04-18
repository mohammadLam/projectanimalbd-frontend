import React from 'react'

interface Props {
  value?: string
  name?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  hint?: string
}

const Textarea: React.FC<Props> = props => {
  const { placeholder, hint, value } = props
  return (
    <div className='form-group'>
      <label>{placeholder}</label>
      <textarea className='h-52' {...props} placeholder={hint || ''}>
        {value}
      </textarea>
    </div>
  )
}

export default Textarea

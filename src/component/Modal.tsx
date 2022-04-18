import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Button from './Button'

interface Props {
  children: React.ReactNode
  isModalOpen: boolean
  openModalFunction: () => void
  closeModalFunction: () => void
  headerText: string
}

const Modal: React.FC<Props> = ({
  children,
  isModalOpen,
  openModalFunction,
  closeModalFunction,
  headerText
}) => {
  ReactModal.setAppElement('#modal')

  return (
    <ReactModal
      closeTimeoutMS={500}
      isOpen={isModalOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}
      className='modal'
      onRequestClose={closeModalFunction}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc>
      <div className='header'>
        <h1 className='text-3xl font-medium'>{headerText}</h1>
        <button
          type='button'
          className='flex items-center justify-center bg-red-200 rounded-full w-8 h-8'
          onClick={closeModalFunction}>
          <svg
            className='fill-red-500'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='18px'
            height='18px'>
            <path d='M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z' />
          </svg>
        </button>
      </div>
      <div className='content'>{children}</div>
    </ReactModal>
  )
}

export default Modal

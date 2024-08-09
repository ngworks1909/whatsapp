import React from 'react'
import { BsPlus, BsEmojiSmile } from 'react-icons/bs'
import SendMessage from './SendMessage';

export default function Input() {
  return (
    <>
    <div className="bg-[#202c33] h-16 flex w-full px-2 items-center sm:px-6">
        <div className='gap-1 sm:gap-3 h-full items-center flex'>
        <BsEmojiSmile className='cursor-pointer' size={22} />
        <BsPlus className='cursor-pointer' size={30} />
        </div>
        <SendMessage/>
    </div>
      
    </>
  )
}

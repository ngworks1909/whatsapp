"use client"
import { ChatState } from '@/atoms/ChatState';
import React, { useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { useRecoilValue } from 'recoil';

export default function SendMessage() {
  const [message, setMessage] = useState('');
  const chat = useRecoilValue(ChatState);
  const { friendId } = chat;
  const handleClick = async() => {

    if(message){
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sendmessage`, {
        method: "POST",
        body: JSON.stringify({friendId, message})
      });
      const json = await response.json();
      if(json.success){
        setMessage('');
      }
    }
  }
  return (
    <>
    <div className='px-2 sm:px-4 w-full'>
        <input type="text" className='h-10 w-full px-3 text-sm font-medium outline-none bg-[#2a3942] rounded-md' onChange={(e) => {e.preventDefault(); setMessage(e.target.value)}} placeholder='Type a message' value={message} /> 
    </div>
    <IoMdSend onClick={async(e) => {e.preventDefault(); await handleClick()}} className='cursor-pointer' size={30}/>
    </>
  )
}

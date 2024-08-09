"use client"
import React from 'react'
import Navbar from './Navbar'
import Input from './Input'
import MessageGroup from './MessageGroup'
import logo from '@/assets/logo.png'
import Image from 'next/image'

export default function ChatRoom({userId, active}: {userId: string, active: boolean}) {
  return (
    <div className={`bg-[#010c18] ${!active && 'vsm:hidden'} flex flex-[2] flex-col`}>
       {active ? <>
        <Navbar type='ChatRoom'  />
       <div className='flex flex-1 flex-col px-4 sm:px-12 py-8 gap-4 overflow-hidden overflow-y-scroll'>
        <MessageGroup senderId={userId}  />

        {/* <div  className={`flex w-fit max-w-[75%] gap-2 rounded-lg px-3 py-2 h-max ml-auto bg-[#005c4b]`}>
           <span className='text-sm'>Hi ra....</span>
           <span className='text-[10px] self-end'>{"8:30AM"}</span>
        </div> */}
       </div>
       <Input/>
       </>: <>
          <div className='h-full w-full flex items-center flex-col gap-2 justify-center'>
            <Image src={logo} alt='Whastapp' className='h-16 w-16' />
            <span>Choose someone to chat with...</span>
          </div>
       </>}
    </div>
  )
}

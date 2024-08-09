"use client"
import React from 'react'
import ChatRoom from './ChatRoom'
import Sidebar from './Sidebar'
import { useRecoilValue } from 'recoil'
import { ChatState } from '@/atoms/ChatState'

export default function Home({userId}: {userId: string}) {
  const chat = useRecoilValue(ChatState);
  return (
    <div className='h-dvh w-dvw overflow-hidden flex p-[10px] sm:p-5'>
        
  <>
    <Sidebar userId={userId} active = {chat.active} />
    <ChatRoom userId={userId} active = {chat.active} />
  </>
    </div>
  )
}

"use client"
import React, {useState, useEffect} from 'react'
import ContactGroup from './ContactGroup'
import { Timestamp } from 'firebase/firestore'
import SearchBar from './SearchBar'
import Navbar from './Navbar'



export type ContactDetails = {
    userId: string,
    friendId: string,
    image: string,
    username: string,
    email: string,
    mobile: string,
    lastMessage: string,
    time: Timestamp,
    messageCount: number,
}

export default function Sidebar({userId, active}: {userId: string, active: boolean}) {
  return (
    <div className={` flex-col bg-[#111b21] border-r border-[#383838] ${active && 'vsm:hidden'} flex-1 mid:flex-[0.85]`}>
        <Navbar type='Chats'/>
        <SearchBar/>
        <div className='h-small sm:h-calc'>
        <div className='flex flex-col h-full bg-[#111b21] overflow-hidden overflow-y-scroll'>
        <ContactGroup userId = {userId} />
        </div>
        </div>
      </div>
  )
}

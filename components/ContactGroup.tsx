import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Contact from './Contact'
import { ContactDetails } from './Sidebar'
import { useContacts } from '@/hooks/useContacts'
import { useRecoilValue } from 'recoil'
import { SearchState } from '@/atoms/SearchState'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContactButtonSkeleton from './skeletons/ContactButtonSkeleton'

export default function ContactGroup({userId}: {userId: string}) {
  
  const {loading, contacts} = useContacts(userId);
  const search = useRecoilValue(SearchState);
  return (
    <>
      {loading && <>
        <ContactButtonSkeleton/>
        <ContactButtonSkeleton/>
        <ContactButtonSkeleton/>
        <ContactButtonSkeleton/>
      </>}
      {!loading && contacts.length === 0 ? <div className='flex items-center h-full justify-center'>
         {search ? <span>No results found</span>: <Link href={'/friends'}>Add friends to chat</Link>}
      </div> : !loading &&  contacts.map((contact: ContactDetails, index: number) => {
        return <Contact key={index} contact = {contact}/>
      })}
    </>
  )
}

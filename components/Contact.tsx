"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiUser } from 'react-icons/ci';
import ContactButton from './ContactButton';
import { ContactDetails } from './Sidebar';

export default function Contact({contact}: {contact: ContactDetails}) {
  return (
    <div className='flex gap-2 transition-all border-b hover:bg-hovered items-center pl-3'>
        <Avatar>
        <AvatarImage src= {contact.image} />
        <AvatarFallback><CiUser size={20}/></AvatarFallback>
        </Avatar>
        <ContactButton contact = {contact} />
    </div>
  )
}

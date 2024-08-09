"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiUser } from "react-icons/ci";
import { useRecoilValue } from 'recoil';
import { ChatState } from '@/atoms/ChatState';
import { useUser } from '@/hooks/useUser';

export default function ChatHeader() {
  const chat = useRecoilValue(ChatState)
  const user = useUser(chat.friendId)
  return (
    <div className="flex gap-4 items-center">
      <Avatar>
        <AvatarImage src={user?.image} />
        <AvatarFallback><CiUser size={20}/></AvatarFallback>
      </Avatar>
      <div className="text-md font-medium tracking-[1px]">{user?.username}</div>
    </div>
  )
}

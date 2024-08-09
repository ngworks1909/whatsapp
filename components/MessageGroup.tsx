import { Message, useMessages } from '@/hooks/useMessages'
import React from 'react'
import MessageItem from './MessageItem';
import { useRecoilValue } from 'recoil';
import { ChatState } from '@/atoms/ChatState';
import MessageSkeleton from './skeletons/MessageSkeleton';
;

export default function MessageGroup({senderId}: {senderId: string}) {

  const chat = useRecoilValue(ChatState);
  const {loading, messages} = useMessages(senderId, chat.friendId)
  // const messages = useMessages(friendId, senderId)

  return (
    <>
     {loading ? <MessageSkeleton/> :
      messages.map((message: Message) => {
           return <MessageItem key={message.messageId} message={message} senderId = {senderId} />
       })}
    </>   
  )
}

import { Timestamp } from 'firebase/firestore';
import React, {useEffect, useRef} from 'react'
import { Message } from '@/hooks/useMessages';

export default function MessageItem({message, senderId}: {message:Message, senderId: string}) {

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
      ref.current?.scrollIntoView({behavior : "smooth"})
  },[]);


  const handleDate = (timestamp: Timestamp) => {
    const milliseconds = (timestamp.seconds * 1000) + (timestamp.nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM'; 
    const formattedTime = `${(hours % 12 || 12).toString()}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
  }
  return (
    <div key={message.messageId} ref={ref} className={`flex w-fit relative max-w-[75%] gap-2 rounded-lg px-3 py-2 h-max ${message.senderId === senderId ? 'ml-auto bg-[#005c4b]': 'bg-[#202c33]' }`}>
           <span className='text-sm font-medium'>{message.message}</span>
           <span className='text-[10px] self-end'>{handleDate(message.date)}</span>
    </div>
  )
}

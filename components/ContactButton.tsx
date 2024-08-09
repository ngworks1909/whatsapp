import React from 'react'
import { useRouter } from 'next/navigation';
import { ContactDetails } from './Sidebar';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useSetRecoilState } from 'recoil';
import { SearchState } from '@/atoms/SearchState';
import { ChatState } from '@/atoms/ChatState';

export default function ContactButton({contact}: {contact: ContactDetails}) {
  const setChat = useSetRecoilState(ChatState);
  const setSearch = useSetRecoilState(SearchState)
  const handleDate = (timestamp: Timestamp) => {
        const milliseconds = (timestamp.seconds * 1000) + (timestamp.nanoseconds / 1000000);
        const today = new Date();
        const todayDay = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();    
        const date = new Date(milliseconds);    
        const givenDay = date.getDate();
        const givenMonth = date.getMonth();
        const givenYear = date.getFullYear();    
        if (todayYear === givenYear && todayMonth === givenMonth && todayDay === givenDay) {
            return 'Today';
        } else if (todayYear === givenYear && todayMonth === givenMonth && todayDay - givenDay === 1) {
            return 'Yesterday';
        } else {
            const formattedDate = `${givenDay}/${(givenMonth + 1)}/${givenYear}`;
            return formattedDate;
        }
  }
  return (
    <button onClick={async(e) => {
       e.preventDefault();
       const friendsArray2 = (await getDoc(doc(db, 'friends', contact.userId))).data()?.friends || []
            const updatedFriendsArray2 = friendsArray2.map((friend: any) => {
                if (friend.friendId === contact.friendId) {
                    return {
                        ...friend,
                        messageCount: 0
                    };
                }
                return friend;
        });
            
            // Update the user document with the modified friends array
        await updateDoc(doc(db, 'friends', contact.userId), { friends: updatedFriendsArray2 });
        setSearch('')
        setChat({active: true, friendId: contact.friendId})

    }} className="flex flex-1 flex-col items-start gap-1 p-3 text-left text-sm">
        <div className="flex w-full flex-col gap-1">
            <div className={`flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                    <div className="font-semibold max-w-[300px] line-clamp-1">{contact.username}</div>
                    {contact.messageCount > 0 && <span className="flex h-2 w-2 rounded-full bg-green-600"></span>}
                </div>
                <div className="ml-auto text-xs text-muted-foreground">{handleDate(contact.time)}</div>
            </div>
        </div>
        <div className={`line-clamp-1 text-sm ${!contact.lastMessage && 'h-4'} ${contact.messageCount > 0 ? 'text-white': 'text-muted-foreground'} w-full`}>{contact.lastMessage}</div>
    </button>
  )
}

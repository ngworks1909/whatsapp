import { useEffect, useState } from "react"
import { pusherClient } from "@/lib/pusher";
import { doc, getDoc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";


export type Message = {
    messageId: string,
    message: string,
    date: Timestamp,
    senderId: string,
    recieverId: string,
    senderDelete: boolean,
    recieverDelete: boolean,
}

export const useMessages = (senderId: string, recieverId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const chatId = `${senderId}_${recieverId}`.split("_").sort().join('')
    useEffect(() => {
        // fetch(`${process.env.NEXT_PUBLIC_URL}/api/fetchmessages/${friendId}`, {
        //     method: 'GET',
        // }).then((response) => {
        //     response.json().then((json) => {setMessages(json.messages)})
        // });
        const unsub = onSnapshot(doc(db, 'messages', chatId), async(document) => {
            const userDocRef = doc(db, 'friends', senderId)
            const friendsArray = (await getDoc(userDocRef)).data()?.friends;
            const updatedFriendsArray = friendsArray.map((friend: any) => {
                if (friend.userId === recieverId) {
                    return {
                        ...friend,
                        messageCount: 0
                    };
                }
                return friend;
            });
            await updateDoc(userDocRef, { friends: updatedFriendsArray });
            setMessages(document.data()?.messages || []);
            setLoading(false)
        })

        return () => {
            unsub()
        }

    }, [senderId, recieverId, chatId]);
    return {loading, messages};
}
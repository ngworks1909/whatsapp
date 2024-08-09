import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { Message } from "@/hooks/useMessages";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


type Params = {
    friendId: string
}

export async function GET(req: NextRequest, {params}: {params: Params}){
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const id = session.user.id;
    const friendId = params.friendId;
    try {
        // const data = await prisma.friend.update({
        //     where: {
        //         userId: id,
        //         friendId
        //     },
        //     data: {
        //         messageCount: 0
        //     },
        //     select: {
        //         incomingMessages: {
        //             where: {
        //                 recieverDelete: false
        //             }
        //         },
        //         outgoingMessages: {
        //             where: {
        //                 senderDelete: false
        //             }
        //         }
        //     }
        
        // });
        // const combinedMessages = [
        //     ...data.incomingMessages,
        //     ...data.outgoingMessages
        // ];

        // const messages = combinedMessages.sort((a, b) => {
        //     return new Date(a.date).getTime() - new Date(b.date).getTime();
        // });

        const messages = await runTransaction(db, async(transaction) => {
            const userDocRef = doc(db, 'friends', session.user.id)
            const friendsArray = (await getDoc(userDocRef)).data()?.friends;
            const updatedFriendsArray = friendsArray.map((friend: any) => {
                if (friend.userId === friendId) {
                    return {
                        ...friend,
                        messageCount: 0
                    };
                }
                return friend;
            });
            transaction.update(userDocRef, { friends: updatedFriendsArray });

            const chatId = `${id}_${friendId}`.split("_").sort().join('')
            const messageDoc = await getDoc(doc(db, 'messages', chatId));
            const messages = messageDoc.exists() ? messageDoc.data().messages as Message[]: []
            return messages;

        })
        return NextResponse.json({success: true, messages: messages})
    } catch (error) {
        return NextResponse.json({success: false, messages: []})
    }
}
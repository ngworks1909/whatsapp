import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { arrayUnion, doc, getDoc, runTransaction } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createId } from '@paralleldrive/cuid2';
// import { pusherServer } from "@/lib/pusher";

export async function POST(req: NextRequest){
    const data = await req.json();
    const recieverId: string = data.friendId;
    const message = data.message || ""
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const id = session.user.id;

    if(!message){
        return NextResponse.json({success: false, error: "No message found"})
    }

    try {
        // await prisma.$transaction(async(tx) => {
        //     const newMessage = await tx.message.create({
        //         data: {
        //             recieverId,
        //             senderId: id,
        //             message,
        //         }
        //     });
        //     await tx.friend.updateMany({
        //         where: {
        //             OR: [
        //                 {userId: id, friendId: recieverId},
        //                 {userId: recieverId, friendId: id}
        //             ]
        //         },
        //         data: {
        //             lastMessage: message,
        //             time: new Date()
        //         }
        //     })
            
        // })
        await runTransaction(db, async(transaction) => {
            const chatId = `${id}_${recieverId}`.split("_").sort().join('');
            await transaction.update(doc(db, 'messages', chatId), {
                messages: arrayUnion({
                    messageId: createId(),
                    message,
                    date: new Date(),
                    senderId:id, 
                    recieverId,
                    senderDelete: false,
                    recieverDelete: false
                })
            });
            const friendsArray = (await getDoc(doc(db, 'friends', id))).data()?.friends || [];
            const time = new Date()

            const updatedFriendsArray = friendsArray.map((friend: any) => {
                if (friend.friendId === recieverId) {
                    return {
                        ...friend,
                        lastMessage: message,
                        time
                    };
                }
                return friend;
            });

            
            // Update the user document with the modified friends array
            transaction.update(doc(db, 'friends', id), { friends: updatedFriendsArray });
            
            
            const friendsArray2 = (await getDoc(doc(db, 'friends', recieverId))).data()?.friends || []
            const updatedFriendsArray2 = friendsArray2.map((friend: any) => {
                if (friend.friendId === id) {
                    return {
                        ...friend,
                        lastMessage: message,
                        time,
                        messageCount: friend.messageCount + 1
                    };
                }
                return friend;
            });
            
            // Update the user document with the modified friends array
            transaction.update(doc(db, 'friends', recieverId), { friends: updatedFriendsArray2 });
            
        })

         

        return NextResponse.json({success: true});
    } catch (error) {
        return NextResponse.json({success: false})
    }
    
}
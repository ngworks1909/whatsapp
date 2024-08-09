import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { arrayRemove, doc, runTransaction } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
    const url = new URL(req.url)
    const id1 = url.searchParams.get('id') || "";
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const id2 = session.user.id || "";
    try {
        // await prisma.$transaction(async(tx) => {
        //     await tx.friend.deleteMany({
        //         where: {
        //             OR: [
        //                 {userId: id1, friendId: id2},
        //                 {userId: id2, friendId: id1}
        //             ]
        //         }
        //     });
        //     const request = await tx.request.findFirst({
        //         where: {
        //             OR: [
        //                 {senderId: id1, recieverId: id2},
        //                 {senderId: id1, recieverId: id2}
        //             ]
        //         },
        //         select: {
        //             requestId: true
        //         }
        //     })
        //     await tx.request.delete({
        //         where: {
        //             requestId: request?.requestId
        //         }
        //     })
        // })

        
        await runTransaction(db, async (transaction) => {
            // References to user documents
            const user1DocRef = doc(db, 'friends', id1);
            const user2DocRef = doc(db, 'friends', id2);

            // Fetch documents
            const user1DocSnap = await transaction.get(user1DocRef);
            const user2DocSnap = await transaction.get(user2DocRef);

            // Use arrayRemove to remove the friend from each user's friends array
            transaction.update(user1DocRef, {
                friends: arrayRemove({
                    friendId: id2
                })
            });
            transaction.update(user2DocRef, {
                friends: arrayRemove({
                    userId: id1
                })
            });

            // Reference to the specific request document
            const requestId = `${id1}_${id2}`.split("_").sort().join('')
            const requestDocRef = doc(db, 'requests', requestId);
            transaction.delete(requestDocRef);
        });
        return NextResponse.json({success: true, message: "Removed friend"})
    } catch (error) {
        return NextResponse.json({success: false, error: "Internal server error"})
    }
}
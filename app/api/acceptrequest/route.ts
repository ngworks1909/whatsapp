import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { arrayUnion, doc, getDoc, runTransaction } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const requestId = data.requestId;
    try {
        // await prisma.$transaction(async(tx) => {
        //     await tx.request.update({
        //         data: {
        //             status: "Friends"
        //         },
        //         where: {
        //             requestId
        //         }
        //     })
        //     const request = await tx.request.findUnique({
        //         where: {
        //             requestId
        //         },
        //         select: {
        //             senderId: true,
        //             recieverId: true
        //         }
        //     });
        //     const user1 = await tx.user.findUnique({
        //         where: {
        //             userId: request?.senderId
        //         }
        //     });
        //     const user2 = await tx.user.findUnique({
        //         where: {
        //             userId: request?.recieverId
        //         }
        //     });
            
        //     await tx.friend.create({
        //         data: {
        //             userId: user1?.userId || "",
        //             friendId: user2?.userId || "",
        //             image: user2?.image || "",
        //             username: user2?.username || "",
        //             email: user2?.email || "",
        //             mobile: user2?.mobile || ""
        //         }
        //     });
        //     await tx.friend.create({
        //         data: {
        //             userId: (user2?.userId || ""),
        //             friendId: (user1?.userId || ""),
        //             image: (user1?.image || ""),
        //             username: (user1?.username || ""),
        //             email: (user1?.email || ""),
        //             mobile: user1?.mobile || ""
        //         }
        //     })
        // })

        await runTransaction(db, async (transaction) => {
            const requestRef = doc(db, "requests", requestId);
            const requestDoc = await transaction.get(requestRef);
            
            
            // Update request status to "Friends"
            transaction.update(requestRef, { status: "Friends" });
            
            const requestData = requestDoc.data();
            const request = {
                senderId: requestData?.senderId,
                recieverId: requestData?.recieverId
            };
            
            // Retrieve user documents
            const user1Ref = doc(db, "users", request.senderId);
            const user1Doc = await getDoc(user1Ref);
            const user1 = user1Doc.data();

            const user2Ref = doc(db, "users", request.recieverId);
            const user2Doc = await getDoc(user2Ref);
            
            
            const user2 = user2Doc.data();
            
            // Create friend documents
            const friend1Ref = doc(db, "friends", user1?.userId);
            const friend2Ref = doc(db, "friends", user2?.userId);

            transaction.update(friend1Ref, {
                friends: arrayUnion({
                    userId: user1?.userId || "",
                    friendId: user2?.userId || "",
                    image: user2?.image || "",
                    username: user2?.username || "",
                    email: user2?.email || "",
                    mobile: user2?.mobile || "",
                    lastMessage: "",
                    time: new Date(),
                    messageCount: 0
                })
            });



            transaction.update(friend2Ref, {
                friends: arrayUnion({
                    userId: user2?.userId || "",
                    friendId: user1?.userId || "",
                    image: user1?.image || "",
                    username: user1?.username || "",
                    email: user1?.email || "",
                    mobile: user1?.mobile || "",
                    lastMessage: "",
                    time: new Date(),
                    messageCount: 0
                })
            });

            const messagegroup = `${user1?.userId}_${user2?.userId}`.split("_").sort().join('')
            transaction.set(doc(db, 'messages', messagegroup), {messages: []})
        });

        return NextResponse.json({success: true})
    } catch (error) {
        return NextResponse.json({success: false, error: "Internal server error"})
    }

}
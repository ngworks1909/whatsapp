import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { doc, increment, runTransaction} from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const data = await req.json();
    try {
        // await prisma.$transaction(async(tx) => {
        //     await tx.request.create({
        //         data: {
        //             senderId: session.user.id,
        //             recieverId: data.recieverId,
        //             senderName: session.user.name,
        //             senderEmail: session.user.email,
        //             senderImage: session.user.image
        //         }
        //     });
        //     await tx.user.update({
        //         where: {
        //             userId: data.recieverId,
        //         },
        //         data: {
        //             requestCount: {
        //                 increment: 1
        //             }
        //         }
        //     })
        // })

        await runTransaction(db, async (transaction) => {
            const requestId = `${session.user.id}_${data.recieverId}`.split("_").sort().join('')
            transaction.set(doc(db, 'requests', requestId), {
                senderId: session.user.id,
                recieverId: data.recieverId,
                senderName: session.user.name,
                senderEmail: session.user.email,
                senderImage: session.user.image,
                date: new Date(),
                status: "Sent"
            });
            // Increment the request count
            transaction.update(doc(db, "users", data.recieverId), {
                requestCount: increment(1)
            });
        });
        return NextResponse.json({success: true, message: "Sent"})
    } catch (error) {
        return NextResponse.json({success: false, error: "Failed"})
    }
}
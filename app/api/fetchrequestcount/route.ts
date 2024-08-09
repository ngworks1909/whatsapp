import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    // const user = await prisma.user.findUnique({
    //     where: {
    //         userId: session.user.id
    //     },
    //     select: {
    //         requestCount: true
    //     }
    // });
    // const count =  (await getDoc(doc(db, 'users', session.user.id))).data()?.requestCount;
    const countDoc = await getDoc(doc(db, 'users', session.user.id));
    const count = countDoc.exists() ? countDoc.data()?.requestCount : 0
    return NextResponse.json({count})
}
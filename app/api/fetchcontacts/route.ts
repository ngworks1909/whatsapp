import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const id = session.user.id;
    try {
        // const friends = await prisma.friend.findMany({
        //     where: {
        //         userId: id
        //     },
        //     orderBy: {
        //         time: "desc"
        //     }
        // });
        const friends = (await getDoc(doc(db, "friends", id))).data()?.friends || [];
        return NextResponse.json({success: true, friends})
    } catch (error) {
        return NextResponse.json({success: false, friends: []})
    }
}
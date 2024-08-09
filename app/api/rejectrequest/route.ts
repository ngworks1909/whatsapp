import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const requestId = url.searchParams.get('id') || "";
    try {
        // await prisma.request.delete({
        //     where: {
        //         requestId
        //     }
        // });
        await deleteDoc(doc(db, 'requests', requestId));
        return NextResponse.json({success: true})
    } catch (error) {
        return NextResponse.json({success: false, error: "Internal server error..."})
    }
}
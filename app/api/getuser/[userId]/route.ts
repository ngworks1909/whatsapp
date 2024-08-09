import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    userId: string
}
type User = {
    userId: string,
    username: string,
    email: string,
    password: string,
    image: string,
    mobile: string
}

export async function GET(req: NextRequest, {params}: {params: Params}){
    const userId = params.userId;
    const userDoc = await getDoc(doc(db, 'users', userId));
    const user = userDoc.data() as User;
    return NextResponse.json({user});
}
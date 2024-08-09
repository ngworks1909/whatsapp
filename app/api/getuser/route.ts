import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type User = {
    userId: string,
    username: string,
    email: string,
    password: string,
    image: string,
    mobile: string
}

export async function GET() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const user: User = session.user
    return NextResponse.json({user});
}
import prisma from "@/db/src";
import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import { getServerSession } from "next-auth"

export const fetchRequestCount = async() => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const user = await prisma.user.findUnique({
        where: {
            userId: session.user.id
        },
        select: {
            requestCount: true
        }
    });
    return user?.requestCount || 0
}
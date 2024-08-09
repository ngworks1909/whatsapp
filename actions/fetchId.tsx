import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import { getServerSession } from "next-auth"

export const fetchId = async() => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    return session.user.id;
}
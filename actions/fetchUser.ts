import prisma from "@/db/src"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase/firebase"

type User = {
    userId: string,
    username: string,
    email: string,
    password: string,
    image: string,
    mobile: string,
    token: string,
    requestCount: number,
} 

export const fetchUser = async(userId: string) => {
    // const user = await prisma.user.findUnique({
    //     where: {
    //         userId
    //     },
    //     select: {
    //         username: true,
    //     }
    // })
    const userDoc = await getDoc(doc(db, 'users', userId));
    const user = userDoc.data() as User;
    return user;
}
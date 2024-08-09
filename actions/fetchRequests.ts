import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import { collection, doc, getDocs, query, runTransaction, where } from "firebase/firestore";
import { getServerSession } from "next-auth"

export const fetchRequests = async() => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    // const user = await prisma.$transaction(async(tx) => {
    //     await tx.user.update({
    //         where: {
    //             userId: session.user.id
    //         },
    //         data: {
    //             requestCount: 0
    //         }
    //     })
    //     const user = await tx.user.findUnique({
    //         where: {
    //                 userId: session.user.id,
    //             },
    //         select: {
    //             incomingRequests: true
    //         }
    //     });
    //     return user;
    // })
    const incomingRequests = await runTransaction(db, async (transaction) => {
        const userDocRef = doc(db, 'users', session.user.id);

        // Fetch the user document
        // const userDocSnap = await transaction.get(userDocRef);
        transaction.update(userDocRef, { requestCount: 0 });

        // Return the updated document's incomingRequests field
        const reqRef = collection(db, 'requests');
        const requestQuery = query(reqRef, where('recieverId', '==', session.user.id));
        const querySnapshot = await getDocs(requestQuery);
        const requests = querySnapshot.docs.map(doc => doc.data());

        return requests;

    });
    const requests = incomingRequests.filter(request => request.status === "Sent") || []
    return requests;
}
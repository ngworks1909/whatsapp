import prisma from "@/db/src/index";
import { db } from "@/firebase/firebase";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { collection, where, query, getDocs, getDoc, or, doc, Timestamp } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest){
    const data = await req.json();
    const emailOrMobile = data.emailOrMobile;
    if(emailOrMobile){
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        const mail = session.user.email;
        const mobile = session.user.mobile;
        const id = session.user.id;

        // const users = await prisma.user.findMany({
        //     where: {
        //         AND: [
        //             {
        //                 OR: [
        //                     {email: {startsWith: emailOrMobile}},
        //                     {mobile: {startsWith: emailOrMobile}}
        //                 ]
        //             },
        //             {
        //                 NOT: [
        //                     {email: mail},
        //                     {mobile: mobile}
        //                 ]
        //             },
        //         ],
        //     },
        //     select: {
        //         userId: true,
        //         username: true,
        //         image: true,
        //         incomingRequests: true,
        //         outgoingRequests: true,
        //         friends: true
        //     }
        // });

        // const results = [];

        // for (const user of users) {
        //     const incomingRequest = user.incomingRequests.find(request => request.senderId === id);
        //     if (incomingRequest) {
        //         results.push({
        //           name: user.username,
        //           image: user.image,
        //           status: incomingRequest.status
        //         });
        //         continue;
        //     }

        //     const outgoingRequest = user.outgoingRequests.find(request => request.recieverId === id);
            // if (outgoingRequest) {
            //     results.push({
            //       name: outgoingRequest.senderName,
            //       image: outgoingRequest.senderImage,
            //       status: outgoingRequest.status === "Sent" ? "Recieved": outgoingRequest.status
            //     });
            //     continue;
            // }
            // results.push({
            //     id: user.userId,
            //     name: user.username,
            //     image: user.image,
            //     status: "Request"
            // });

        // }
        const usersRef = collection(db, 'users');


        const emailQuery = query(
            usersRef,
            where('email', '>=', emailOrMobile),
            where('email', '<=', emailOrMobile + '\uf8ff')
        );
    
        // Query to find users where mobile starts with emailOrMobile
        const mobileQuery = query(
            usersRef,
            where('mobile', '>=', emailOrMobile),
            where('mobile', '<=', emailOrMobile + '\uf8ff')
        );
    
        // Execute both queries
        const [emailSnapshot, mobileSnapshot] = await Promise.all([
            getDocs(emailQuery),
            getDocs(mobileQuery)
        ]);
    
        // Combine the results of both queries
        const selectedUsers = [...emailSnapshot.docs, ...mobileSnapshot.docs]
            .map(doc => doc.data())
            .filter(user => user.email !== mail && user.mobile !== mobile);
    

        const results = [];

        for(const user of selectedUsers) {
            const requestId = `${session.user.id}_${user.userId}`.split("_").sort().join('')
            const requestDoc = await getDoc(doc(db, "requests", requestId));
            if(!requestDoc.exists()){
                results.push({
                    id: user.userId,
                    name: user.username,
                    image: user.image,
                    status: "Request"
                });
                continue;
            }
            const request = requestDoc.data();
            if(request.senderId = id){
                results.push({
                    name: user.username,
                    image: user.image,
                    status: request.status
                  });
                  continue;
            }

            results.push({
                name: request.senderName,
                image: request.senderImage,
                status: request.status === "Sent" ? "Recieved": request.status
            });

        }

        


        
        return NextResponse.json({success: true, users: results})
    }
    return NextResponse.json({success: true, users: []})
}
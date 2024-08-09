import prisma from "@/db/src/index";
import { signupInput } from "@/zod/validateUser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc, runTransaction } from "firebase/firestore";


export async function POST(req: NextRequest){
    const body = await req.json();
    let success = false;
    const signupSuccess = signupInput.safeParse(body);
    if(!signupSuccess){
        return NextResponse.json({success, error: "Invalid inputs..."})
    }
    const {username, email, password, mobile} = body;
    try {
        // const existingUser = await prisma.user.findFirst({
        //     where: {
        //         email
        //     },
        //     select: {
        //         userId: true
        //     }
        // });
        // if(existingUser) {
        //     return NextResponse.json({success, error: 'User already exists...'}, {status: 400});
        // }
        // const salt = await bcrypt.genSalt(10);
        // const hashedpassword = await bcrypt.hash(password, salt);
        // await prisma.user.create({
        //     data: {
        //         username,
        //         email,
        //         password: hashedpassword,
        //         mobile
        //     },
        //     select: {
        //         userId: true
        //     }
        // });
        const existingUser = await fetchSignInMethodsForEmail(auth, email);
        if(existingUser.length > 0) {
            return NextResponse.json({success, error: 'User already exists...'}, {status: 400});
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await runTransaction(db, async (transaction) => {
            // Define document references
            const friendsRef = doc(db, 'friends', user.uid);
            const associatesRef = doc(db, 'associates', user.uid);
            const userDocRef = doc(db, 'users', user.uid);

      
            // Initialize references with empty objects
            transaction.set(friendsRef, {friends: []});
            transaction.set(associatesRef, {associates: []});

      
            // Create a user document with embedded references
            transaction.set(userDocRef, {
              userId: user.uid,
              username,
              email,
              password: hashedPassword,
              image: "https://github.com/shadcn.png",
              mobile,
              createdAt: new Date(),
              friends: friendsRef,
              associates: associatesRef
            });
          });
        success = true;
        return NextResponse.json({success, message: "User signup successful..."});
    } catch (error) {
        success = false;
        return NextResponse.json({success, error: 'Internal server error...'}, {status: 500});
    }
    


}
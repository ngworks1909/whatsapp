/* eslint-disable no-undef */
import prisma from '@/db/src/index';
import { signinInput } from '@/zod/validateUser';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWTPayload, SignJWT, importJWK } from 'jose';
import { fetchSignInMethodsForEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


const generateJWT = async (payload: JWTPayload) => {
    const secret = process.env.JWT_SECRET || 'secret';
  
    const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
  
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('365d')
      .sign(jwk);
  
    return jwt;
  };
  

export const NEXT_AUTH_CONFIG = {
    providers: [
      CredentialsProvider({
          name: "credentials",
          credentials: {},
          async authorize(credentials: any) {
              const {email, password} = credentials;
              const signSuccess = signinInput.safeParse({email, password})
              if(!signSuccess){
                return null;
              }
              try {
                // const user = await prisma.user.findFirst({
                //   where: {
                //     email
                //   },
                  // select: {
                  //   userId: true,
                  //   username: true,
                  //   email: true,
                  //   password: true,
                  //   image: true,
                  //   mobile: true
                  // }
                // });

                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const userAuth = userCredential.user;
                if(!userAuth){
                  return null;
                }
                const userDocRef = doc(db, 'users', userAuth.uid);
                const userDoc = await getDoc(userDocRef);

                const user = userDoc.data();

                
                if(!user || !await bcrypt.compare(password, user.password)){
                  return null;
                }
                const jwt = await generateJWT({
                    id: user.userId,
                });
                await updateDoc(userDocRef, {
                    token: jwt,
                });
                return {
                  id: user.userId,
                  name: user.username,
                  email: user.email,
                  image: user.image,
                  mobile: user.mobile,
                  token: jwt
                }
              } catch (error) {
                return null;
              } 
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
            token.jwtToken = user.token;
            token.mobile = user.mobile;
        }
        return token;
      },
      // eslint-disable-next-line no-unused-vars
      session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.uid;
              session.user.mobile = token.mobile;
          }
          return session
      }
    },
    pages: {
      signIn: '/login'
    }
    
  }
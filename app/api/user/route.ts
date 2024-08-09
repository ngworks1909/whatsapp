import { type NextRequest, NextResponse } from 'next/server';
// import db from '@/db/src/index';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
 
  const usersCollection = collection(db, 'users');

    // Create a query to find the document where 'token' equals the provided token
    const q = query(usersCollection, where('token', '==', token));
    
    // Execute the query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({user: null});
    }

    // Get the first matching document (assuming tokens are unique)
    const user = querySnapshot.docs[0].data();
  return NextResponse.json({
    user,
  });
}
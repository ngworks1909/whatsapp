import Auth from '@/components/Auth'
import { NEXT_AUTH_CONFIG } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  const user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user?token=${session.user.token}`);  
  const json = await user.json();
  if(!json.user){
    redirect("/")
  }
  return (
    <Auth type = "Login"/>
  )
}

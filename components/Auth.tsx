import React from 'react'
import Link from 'next/link'
import AuthWrapper from './AuthWrapper';
import Button from './Button';
// import GoogleButton from './GoogleButton';


export default function Auth({type}: {type: "Login" | "Signup"}) {
  return (
    <div className='h-dvh flex items-center w-full justify-center'>
      <div className="flex items-center justify-center [&amp;>div]:w-full">
        <div className="rounded-xl border min-w-[350px] sm:w-[450px] bg-card text-card-foreground shadow">
            <div className="flex flex-col p-6 space-y-1">
                <h3 className="font-semibold tracking-tight text-2xl">{type} to Whatsapp</h3>
                <p className="text-sm text-muted-foreground">{type === "Signup" ? 'Enter your details below to create your account': 'Enter your below below to login your account'}</p>
            </div>
            <div className="p-6 pt-0 grid gap-4">
                {/* <GoogleButton/> */}
                {/* <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">OR</span>
                    </div>
                </div> */}
                <AuthWrapper type={type}/>
            </div>
            <Button type = {type} />
            <div className='text-center text-sm text-muted-foreground mt-2 pb-6'>
                {type === 'Signup' ? `Already have an account?`: "Don't have an account?"} <Link href={`${type ==='Login' ? '/signup': '/login'}`} className='pl-2 underline'>{type ==='Login'? 'Signup': 'Login'}</Link>
            </div>
        </div>
       </div>
    </div>
  )
}

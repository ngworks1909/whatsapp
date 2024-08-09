"use client"
import { signIn } from 'next-auth/react';
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useRouter } from 'next/navigation';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export default function GoogleButton() {

  const router = useRouter();
  const { toast } = useToast();
  return (
    <div onClick={async(e) => {
        e.preventDefault(); 
        const response = await signIn('google');
        router.push("/")
    }
    } className="gap-6">
        <button className="inline-flex w-full gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
            <FaGoogle/>
            <span>Google</span>
        </button>
    </div>
  )
}

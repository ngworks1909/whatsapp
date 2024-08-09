"use client"
import { useRequestCount } from '@/hooks/useRequestCount'
import Link from 'next/link'
import React from 'react'
import { CiCircleQuestion } from 'react-icons/ci'

export default function NavRequestLink() {
  const count = useRequestCount()
  return (
    <Link href={'/requests'} className="flex items-center justify-between w-full gap-2 px-2 py-1.5">
            <div className='flex gap-2'>
            <CiCircleQuestion size={20}/>
            <span>Requests</span>
            </div>
            {count > 0 && <span className='bg-primary text-black text-xs font-bold h-4 w-4 text-center rounded-full'>{count}</span>}
    </Link>
  )
}

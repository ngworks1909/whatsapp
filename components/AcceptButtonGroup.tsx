"use client"
import React from 'react'
import { Button } from './ui/button'

export default function AcceptButtonGroup({requestId}: {requestId: string}) {
  const handleDelete = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rejectrequest?id=${requestId}`, {
        method: "DELETE"
    })
  }
  const handleAccept = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/acceptrequest`, {
        method: "POST",
        body: JSON.stringify({requestId})
    });
    const json = await response.json();
    console.log("success" + json.success)
  }
  return (
    <div className='flex justify-between'>
      <Button variant={"secondary"} onClick={async(e) => {e.preventDefault(); await handleDelete()}} >Reject</Button>
      <Button onClick={async(e) => {e.preventDefault(); await handleAccept()}} >Accept</Button>
    </div>
  )
}

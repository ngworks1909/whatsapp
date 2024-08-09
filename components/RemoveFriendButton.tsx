"use client"
import React from 'react'
import { AlertDialogAction } from './ui/alert-dialog';

export default function RemoveFriendButton({friendId}: {friendId: string}) {
    const handleClick = async() => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/removefriend?id=${friendId}`, 
            {method: "DELETE"}
        );
        const json = await response.json();

    }

  return (
      <AlertDialogAction onClick={async() => { await handleClick() }} >Continue</AlertDialogAction>
  )
}

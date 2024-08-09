import { fetchUser } from '@/actions/fetchUser';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiUser } from "react-icons/ci";
import React, { useEffect, useState } from 'react'

type User = {
    userId: string,
    username: string,
    email: string,
    password: string,
    image: string,
    mobile: string
}

export default function NavHeader() {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/getuser`, {method: "GET"}).then(async(response) => {const json = await response.json(); setUser(json.user)})
    }, [])
    return (
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback><CiUser size={20}/></AvatarFallback>
          </Avatar>
        </div>
    )
}

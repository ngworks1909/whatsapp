import { useEffect, useState } from "react"

type User = {
    userId: string;
    username: string;
    email: string;
    password: string;
    image: string;
    mobile: string;
    token: string;
    requestCount: number;
}

export const useUser = (userId: string) => {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/getuser/${userId}`, {method: "GET"}).then(async(response) => {
            const json = await response.json();
            setUser(json.user);
        })
    }, [userId])
    return user;
}
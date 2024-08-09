import { db } from "@/firebase/firebase";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"

export type Friend = {
    id?: string,
    name: string,
    image: string,
    status: string
}

export const useDebounce = (data: string, timeout: number) => {
    const [debouncedValue, setDebouncedValue] = useState<Friend[]>([]);
    useEffect(() => {
        let timeOutNumber = setTimeout(async() => {
            fetch(`${process.env.NEXT_PUBLIC_URL}/api/searchuser`, {
                method: 'POST',
                body: JSON.stringify({emailOrMobile: data})
            }).then((response) => {
                response.json().then((json) => {setDebouncedValue(json.users)})
            })
        }, timeout);
        return () => {
            clearTimeout(timeOutNumber);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return debouncedValue;

}
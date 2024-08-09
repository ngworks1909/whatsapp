import { useEffect, useState } from "react"

export const useRequestCount = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/fetchrequestcount`, {
            method: 'GET',
        }).then((response) => {
            response.json().then((json) => {setCount(json.count)})
        })
    }, []);

    return count;
}
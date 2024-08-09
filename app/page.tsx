import { fetchId } from '@/actions/fetchId'
import Home from '@/components/Home'
import React from 'react'


export default async function page() {
    const id = await fetchId()
    return (
        <>
         <Home userId = {id}/>
        </>
    )
}

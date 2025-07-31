import Userstable from '@/components/super-admin/users/userstable'
import { getUsers } from '@/lib/users';
import React from 'react'



async function Page({searchParams} : {searchParams: Promise<{query?:string}>}) {
    const {query} = await searchParams

    const userList = await getUsers()

    return (
        <>
            <Userstable  query={query} userList={userList}/>
        </>
    )
}

export default Page

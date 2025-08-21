import Spinner from '@/components/spinner';
import Userstable from '@/components/super-admin/users/userstable'
import { MAX_NUMBERS_PER_PAGE } from '@/lib/types';
import { getUsers, getUsersCount } from '@/lib/users';
import React, { Suspense } from 'react'



async function Page({searchParams} : {searchParams: Promise<{query?:string, page?:number}>}) {
    const {query, page} = await searchParams

    const pages = page || 1
    
    const userList = await getUsers(query, page)
    const usersCount = await getUsersCount()
    const pageLimit = Math.ceil(usersCount / MAX_NUMBERS_PER_PAGE)

    return (
        <>
            <Userstable page={pages} pageLimit={pageLimit} userList={userList}/>
        </>
    )
}

export default Page

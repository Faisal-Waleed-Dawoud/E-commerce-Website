import Button from '@/components/button'
import CreateStore from '@/components/seller/store/createStore'
import { getUser } from '@/lib/database'
import { User } from '@/lib/types'
import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import React from 'react'


async function Page() {

    const {userId} = await auth()

    if (!userId) {
        return notFound()
    }

    const user = await getUser(userId) as User


    return (
        <>
            <h1>Store</h1>
            <div>
                <div>
                    <h3>It seems you do not have a store</h3>
                    <CreateStore sellerId={user.id}/>
                </div>
            </div>
        </>
    )
}

export default Page

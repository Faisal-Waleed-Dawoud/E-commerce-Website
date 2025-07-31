import { createUserDB, deleteUserDB, updateUserDB } from '@/lib/database'
import { Roles } from '@/lib/types'
import { getUserDetails } from '@/lib/utils'
import { clerkClient } from '@clerk/nextjs/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'



export async function POST(req: NextRequest) {
    try {
    const evt = await verifyWebhook(req)

    const eventType = evt.type

    const {id} = evt.data

    if (eventType === "user.created" || eventType === "user.updated") {

        const user = getUserDetails(evt.data)

        if (eventType === 'user.created') {

            if (!user.role) user.role = Roles.buyer

            createUserDB(user.id, user.firstName, user.lastName, user.userName, user.email, user.role)

            await (await clerkClient()).users.updateUser(user.id,{publicMetadata: {role: user.role}})

        } else if (eventType === "user.updated") {

            updateUserDB(user.id, user.firstName, user.lastName, user.userName, user.email, user.role)
            
        }
    }
    
    if (eventType === "user.deleted") {
        deleteUserDB(id)
    }
    
    return new Response('Webhook received', { status: 200 })
    } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
}
}
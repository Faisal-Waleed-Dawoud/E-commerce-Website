'use server'

import { PrismaClient, Roles } from "@/app/generated/prisma"
import { cache } from "react"


const prisma = new PrismaClient()

// The user read is not needed as reading is done through clerk

// User DB Create
export async function createUserDB(clerkId:string, firstName:string, lastName:string, userName:string, email:string, role:Roles) {
    try {
        await prisma.user.create({data:{
            clerkUserId: clerkId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: userName,
            role: role,
        }})
    } catch (error) {
        return error
    }
}


// User DB Update
export async function updateUserDB(clerkId:string, firstName:string, lastName:string, userName:string, email?:string, role) {
    try {
        await prisma.user.update({
            where: {clerkUserId: clerkId},
            data: {
                firstName: firstName,
                lastName: lastName,
                username: userName,
                email: email,
                role: role,
            }
        })
    } catch(error) {
        return error
    }
}

// User DB Delete
export async function deleteUserDB(id:string) {
    try {
        await prisma.user.delete({
            where: 
            {clerkUserId: id}
        })
    } catch(error) {
        return error
    }
}

export const getUser = cache(async (clerkUserId:string) => {
    try {
        const user = await prisma.user.findUnique({where:{clerkUserId}})
        return user
    } catch(error) {
        return error 
    }
}) 


// Create Store
export async function createStore(userId:string ,storeName:string, description:string, logo:string, banner: string) {
    try {
        await prisma.user.update({
            where: {id:userId},
            data: {
                store: {
                    create: {
                        name: storeName,
                        description,
                        logo,
                        banner,
                    }
                }
            }
        })
        
    } catch(error) {
        return error
    }
}

export async function deleteStore(userId:string) {
    try {
        await prisma.user.update({
            where: {id:userId},
            data: {
                store:{
                    delete:{
                        userId:userId
                    }
                }
            }
        })
    } catch(error) {
        return error
    }
}

export const getUserStore = cache(async (sellerId:string) => {
    try {
        const store = await prisma.store.findUnique({
            where: {userId: sellerId}
        })
        return store
    } catch(error) {
        return error
    }
})


export const getStore = cache(async (stroId:string) => {
    try {
        const store = await prisma.store.findUnique({where:{id:stroId}})
        return store
    } catch(error) {
        return error
    }
})

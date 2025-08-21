'use server'

import { PrismaClient, Roles } from "@/app/generated/prisma"


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
            role: role
        }})
    } catch (error) {
        console.log(error)
        return error
    }
}


// User DB Update
export async function updateUserDB(clerkId:string, firstName:string, lastName:string, userName:string, email:string, role) {
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
        console.log(error) 
        return error
    }
}

// User DB Delete
export async function deleteUserDB(clerkUserId:string) {
    try {
        await prisma.user.delete({
            where: 
            {clerkUserId}
        })
    } catch(error) {
        console.log(error)
        return error
    }
}

export async function getUser(clerkUserId:string) {
    try {
        const user = await prisma.user.findUnique({where:{clerkUserId}})
        return user
    } catch(error) {
        console.log(error)
        return error 
    }
}

// Create Store
export async function createStore(userId:string ,storeName:string) {
    await prisma.user.update({
        where: {id:userId},
        data: {
            store: {
                create: {
                    name: storeName,
                }
            }
        }
    })
}

export async function deleteStore(userId:string) {
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
}
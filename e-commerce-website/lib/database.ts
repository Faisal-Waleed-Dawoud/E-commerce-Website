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

// User DB Selete
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
'use server'

import { revalidatePath } from "next/cache"
import { clerkClient } from "@clerk/nextjs/server"


export type Errors = {
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?:string,
    password?:string,
    role?:string,
    phone?:string
}

export type formState = {
    errors: Errors
}

// Define the usesrs server actions here
export async function createUserFunction(prevState: formState, formData: FormData) {
    const firstName = formData.get("first-name") as string
    const lastName = formData.get("last-name") as string
    const userName = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string
    const phone = formData.get("phone") as string

    const errors: Errors = {}

    if(!userName) {
        errors.userName = "Empty Username"
    }

    if (!firstName) {
        errors.firstName = "Empty First Name"
    }

    if (!lastName) {
        errors.lastName = "Empty Last Name"
    }

    if (!email) {
        errors.email = "Empty Email"
    }

    if (!password) {
        errors.password = "Empty Password"
    }

    if (!role) {
        errors.role = "Please Select a Role"
    }

    if (!phone) {
        errors.phone = "Empty Phone Number"
    }

    if (!phone.startsWith("+") && phone) {
        errors.phone = "Phone Number Must Start With The Country Code"
    }

    if (Object.keys(errors).length > 0) {
        return {errors}
    }

    try {
        const client = await clerkClient()
        const user = await client.users.createUser({
            firstName: firstName,
            lastName: lastName,
            username: userName,
            emailAddress: [email],
            password: password,
            publicMetadata: {role: role},
        })
        console.log(user)
        revalidatePath("/super-admin/users")
    } catch(error) {
        console.log(error)
    }

}
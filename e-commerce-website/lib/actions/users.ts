'use server'
import { revalidatePath } from "next/cache"
import { clerkClient } from "@clerk/nextjs/server"
import { MAX_NUMBERS_PER_PAGE, Roles } from "../types"
import { cache } from "react"
import { createUserDB, deleteUserDB, updateUserDB } from "../db/database"

// This type is for errprs that might happen to the user form fields
// The unhandled error is for connection or clerk unhandeld errors
export type Errors = {
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    password?: string,
    role?: string,
    unhandledMessage?: string
}

// This indicates what will be the state of the form and its content
// The errors property contains the possible errors for the user form
// The payload contains the recieved formData
export type formState = {
    errors?: Errors,
    payload?: FormData;
    status?: number
}


// Create User
export async function createUserFunction(prevState: formState, formData: FormData) {
    const firstName = formData.get("first-name") as string
    const lastName = formData.get("last-name") as string
    const userName = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string

    const errors: Errors = {}

    if (!userName) {
        errors.userName = "Empty Username"
    } else if (userName.length < 4 || userName.length > 64) {
        errors.userName = "Username length must be between 4 and 64"
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

    if (Object.keys(errors).length > 0) {
        return { errors, payload: formData, status: 400 }
    }

    try {
        const client = await clerkClient()
        const user = await client.users.createUser({
            firstName: firstName,
            lastName: lastName,
            username: userName,
            emailAddress: [email],
            password: password,
            publicMetadata: { role: role },
        })
        // This function is only for testing whenever the webhook is not activiated
        createUserDB(user.id, firstName, lastName, userName, email, Roles[role])
        revalidatePath("/super-admin/users")
        return { status: 200 }
    } catch (error: any) {
        errors.unhandledMessage = error.errors?.[0]?.message
        return { errors, payload: formData, status: 400 }
    }
}

// Read 
// Many Users
export const getUsers = cache(async(query?: string, page?: number) => {
    const { users } = await clerkClient();
    if (query || page) {
        return (await users.getUserList({
            query: query,
            limit: MAX_NUMBERS_PER_PAGE,
            offset: (--page * MAX_NUMBERS_PER_PAGE)
        })).data;
    } else {
        return (await users.getUserList({
            limit: MAX_NUMBERS_PER_PAGE,
            offset: (--page * MAX_NUMBERS_PER_PAGE)
        })).data;
    }
})


// Single User
export const getUser = cache(async(userId: string) => {
    try {
        const { users } = await clerkClient();
        return (await users.getUser(userId))
    } catch(error) {
        return error
    }
})

// Update
// Takes the userId which will be used in updating
export async function updateUserData(userId: string, prevState: formState, formData: FormData) {

    const firstName = formData.get("first-name") as string
    const lastName = formData.get("last-name") as string
    const userName = formData.get("username") as string
    const role = formData.get("role") as string

    const errors: Errors = {}

    if (!userName) {
        errors.userName = "Empty Username"
    } else if (userName.length < 4 || userName.length > 64) {
        errors.userName = "Username length must be between 4 and 64"
    }

    if (!firstName) {
        errors.firstName = "Empty First Name"
    }

    if (!lastName) {
        errors.lastName = "Empty Last Name"
    }

    if (!role) {
        errors.role = "Please Select a Role"
    }

    if (Object.keys(errors).length > 0) {
        return { errors, payload: formData, status: 400 }
    }

    try {
        await (await clerkClient()).users.updateUser(userId, {
            firstName: firstName,
            lastName: lastName,
            username: userName,
            publicMetadata: { role: role },
        })
        updateUserDB(userId, firstName, lastName, userName, undefined, role)
        revalidatePath(`/super-admin/users`)
        return { status: 200, payload: formData, errors }
    } catch (error: any) {
        errors.unhandledMessage = error.errors?.[0]?.message
        return { errors, payload: formData, status: 400 }
    }
}

// Delete
export async function deleteUserClerk(userId: string) {
    const errors: Errors = {}
    try {
        (await clerkClient()).users.deleteUser(userId)
        deleteUserDB(userId)
        revalidatePath("/super-admin/users")
        return { status: 200 }
    } catch (error: any) {
        errors.unhandledMessage = error.errors?.[0]?.message
        return { errors, status: 400 }
    }
}
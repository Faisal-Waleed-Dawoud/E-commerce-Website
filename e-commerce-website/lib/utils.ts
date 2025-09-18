import { auth, currentUser, UserJSON } from "@clerk/nextjs/server"
import { Roles } from "./types"
import { cache } from "react"

// This function is used to capitalize the names in the header component
export const capitlizeFirstLetter = (text: string) => {
    text = text[0].toUpperCase() + text.substring(1).toLowerCase()
    return text
}   

// This function returns the integer date and turn it into date in a dd-mm-yyyy format 
export const formatDate = (time: number) => {
    const date = new Date(time)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

export const getUserDetails = (user:UserJSON) => {
    const {id,first_name, last_name, username, email_addresses, primary_email_address_id, public_metadata} = user
    const {email_address} = email_addresses.find(email => email.id === user.primary_email_address_id)
    const data: Record<string,any> = {
        id:id,
        firstName: first_name,
        lastName: last_name,
        userName: username,
        email: email_address,
        role: public_metadata.role
    }
    return data
}


// This function returns the current user role
// if the role contains _ like super_admin it will be turned into super-admin
export const currentUserRouteRole = cache(async () => {
    const user = await currentUser()
    if (user) {
        const role = user?.publicMetadata.role
        if (role === "super_admin") {
            const replacedText = Roles[role].replace("_", "-")
            return replacedText
        } 
        return role
    }
})

export const authUserId = cache(async() => {
    const {userId} = await auth()
    return userId
})
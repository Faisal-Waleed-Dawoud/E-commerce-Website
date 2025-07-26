import { User } from "@clerk/nextjs/server"

export const capitlizeFirstLetter = (text: string) => {
    text = text[0].toUpperCase() + text.substring(1).toLocaleLowerCase()
    return text
}   

export const formatDate = (time: number) => {
    const date = new Date(time)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

export const getUserDetails = (user:User) => {
    const {id,firstName, lastName, username, emailAddresses, publicMetadata} = user
    const {emailAddress} = emailAddresses.find(email => email.id === user.primaryEmailAddressId)
    const data = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        userName: username,
        email: emailAddress,
        role: publicMetadata.role
    }
    return data
}

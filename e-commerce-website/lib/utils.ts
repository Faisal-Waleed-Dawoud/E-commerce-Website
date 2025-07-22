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


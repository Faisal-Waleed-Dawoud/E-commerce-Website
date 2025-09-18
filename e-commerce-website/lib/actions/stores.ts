'use server'
import { revalidatePath } from "next/cache";
import { createStore } from "../db/database";
import ImageKit from "imagekit";
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError } from "@imagekit/next";
import { PrismaClientKnownRequestError } from "@/app/generated/prisma/runtime/library";

type StoreErrors = {
    storeName: string,
    storeDescription: string,
    storeLogo?: string,
    storeBanner?: string,
    unhandledErorr?: string
}

export type storeFormState = {
    errors?: StoreErrors,
    payload?: FormData;
    status?: number
}

const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT
})

export async function createStoreAction(sellerId: string, prevState: storeFormState, formData: FormData) {
    const errors: StoreErrors = {}

    let storeName = formData.get("store-name") as string
    const storeDescription = formData.get("store-description") as string
    const storeLogo = formData.get("store-logo") as File
    const storeBanner = formData.get("store-banner") as File


    if (!storeName) {
        errors.storeName = "Store Name Cannot Be Empty"
    }


    if (storeName.includes(" ")) {
        storeName = storeName.trim()
        storeName = storeName.split(/\s+/).join("_")
    }



    if (!storeDescription) {
        errors.storeDescription = "Store Description Cannot Be Empty"
    }

    if (storeDescription.length > 75) {
        errors.storeDescription = "Store Description is More Than 75 Words"
    }

    if (storeDescription.match(/(<|>|"|!|&|\*|\(|\)|=|\+|\^|'|"|`|\@|#|%|\$|~|\|)/gm)) {
        errors.storeDescription = "Store Description Cannot Have Special Charcters"
    }

    if (storeName.match(/(<|>|"|!|&|\*|\(|\)|=|\+|\^|'|"|`|\@|#|%|\$|~|\|)/gm)) {
        errors.storeName = "Store Name Cannot Have Special Charcters"
    }

    if (storeName.match(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/ug)) {
        errors.storeName = "Store Name Cannot Have Emojies"
    }

    if (storeDescription.match(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/ug)) {
        errors.storeDescription = "Store Description Cannot Have Emojies"
    }


    if (storeLogo.size === 0) {
        errors.storeLogo = "Upload the Store Logo"
    } else if (!storeLogo.name.match(/.(png|jpg|jpeg|webp)/)) {
        errors.storeLogo = "Store Logo Must be in png, jpg, jpeg or webp Format"
    }

    if (storeBanner.size === 0) {
        errors.storeBanner = "Upload the Store Banner"
    } else if (!storeBanner.name.match(/.(png|jpg|jpeg|webp)/)) {
        errors.storeBanner = "Store Banner Must be in png, jpg, jpeg or webp Format"
    }

    if (Object.keys(errors).length > 0) {
        return { errors, payload: formData, status: 400 }
    }

    const result = await Promise.all([storeLogo.arrayBuffer(), storeBanner.arrayBuffer()])

    const logo = result[0]
    const banner = result[1]

    const bufferLogo = Buffer.from(logo)
    const bufferBanner = Buffer.from(banner)


    try {

        const resultPromise = await Promise.all([
            imageKit.upload({
                file: bufferLogo,
                fileName: storeLogo.name,
                folder: `/Stores/${storeName}`,
            }),
            imageKit.upload({
                file: bufferBanner,
                fileName: storeBanner.name,
                folder: `/Stores/${storeName}`,
            })
        ])
        const [{ fileId: logoId }, { fileId: bannerId }] = resultPromise
        await createStore(sellerId, storeName, storeDescription, logoId, bannerId)
        revalidatePath("/seller/store")
        return { status: 200 }
    } catch (error: any) {

        if (error instanceof ImageKitInvalidRequestError) {
            errors.unhandledErorr = error.message
        } else if (error instanceof ImageKitUploadNetworkError) {
            errors.unhandledErorr = error.message
        } else if (error instanceof ImageKitServerError) {
            errors.unhandledErorr = error.message
        } else if (error instanceof ImageKitAbortError) {
            errors.unhandledErorr = error.reason
        } else if (error instanceof PrismaClientKnownRequestError) {
            errors.unhandledErorr = "The Store Name is Taken, Try Another One"
        } else {
            errors.unhandledErorr = error.message
        }

        return { errors, payload: formData, status: 400 }
    }
}
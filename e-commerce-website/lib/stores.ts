'use server'
import { revalidatePath } from "next/cache";
import { createStore } from "./database";

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

export async function createStoreAction(sellerId:string, prevState:storeFormState, formData:FormData) {
    const errors: StoreErrors = {}

    const storeName = formData.get("store-name") as string
    const storeDescription = formData.get("store-description") as string
    const storeLogo = formData.get("store-logo") as File

    if (!storeName) {
        errors.storeName = "Store Name Cannot Be Empty"
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

    if (Object.keys(errors).length > 0) {
        return {errors, payload:formData, status:400}
    }

    try {
        await createStore(sellerId, storeName)
        revalidatePath("/seller/store")
        return {status:200}
    } catch (error: any) {
        errors.unhandledErorr = error.errors?.[0]?.message
        return { errors, payload: formData, status: 400 }
    }
}
'use client'
import Submit from '@/components/submit'
import { createStoreAction, storeFormState } from '@/lib/stores'
import Form from 'next/form'
import React, { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import UploadIcon from '@mui/icons-material/Upload';
import Image from 'next/image'



function CreateStoreForm({sellerId} : {sellerId:string}) {

    const [image, setImage] = useState<File | null>(null)

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        setImage(e.target.files[0])
    }

    const previewImage = image ? URL.createObjectURL(image) : null

    const initalState : storeFormState ={
        errors: {}
    }

    const createStoreWithId = createStoreAction.bind(null, sellerId)

    const [state, formAction] = useActionState(createStoreWithId, initalState)

    let toaster : string | React.ReactElement = ""
    useEffect(() => {

    if (state.status === 200) {
        toaster = toast.success("Store Created Successfully")
    } else if (state.status === 400) {
        toaster = toast.error("Cannot Create the Store")
    }

    }, [state])



    return (
        <>
            <Form action={formAction} className='flex flex-col gap-4'>
                <div className='input-container'>
                    <label htmlFor="storename">Store Name<span className='text-red-400'>*</span></label>
                    <input type="text" defaultValue={(state?.payload?.get("store-name") || "") as string} name="store-name" className={`input ${state?.errors?.storeName ? "invalid-input" : "filling-input"}`} id="storename" />
                    {state?.errors?.storeName && (<p className='invalid-input-label'>{state.errors.storeName}</p>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="storedesc">Store Description<span className='text-red-400'>*</span></label>
                    <textarea defaultValue={(state?.payload?.get("store-description") || "") as string} placeholder='Store description should not be more than 75 words' name="store-description" className={`input h-40 ${state?.errors?.storeName ? "invalid-input" : "filling-input"}`} id="storedesc" />
                    {state?.errors?.storeName && (<p className='invalid-input-label'>{state.errors.storeName}</p>)}
                </div>
                <div className='input-container'>
                    <label htmlFor="storelogo" className='h-24 flex items-center justify-center flex-col outline-dashed outline-4 outline-secondary-lighter cursor-pointer rounded-md duration-300 hover:text-primary hover:outline-primary'>
                        <UploadIcon/>
                        <span>Store Logo</span>
                    </label>
                    <input type='file' onChange={handleImageChange} defaultValue={(state?.payload?.get("store-logo") || "") as string} name="store-logo" className={`hidden`} id="storelogo" />
                    {state?.errors?.storeLogo && (<p className='invalid-input-label'>{state.errors.storeLogo}</p>)}
                </div>
                {
                    previewImage && (
                    <div>
                        <Image src={previewImage} width={500} height={500} alt=''/>
                    </div>)
                }
                <div>
                    <Submit text={"Create Store"}/>
                </div>
            </Form>
        {toaster}
        </>
    )
}

export default CreateStoreForm

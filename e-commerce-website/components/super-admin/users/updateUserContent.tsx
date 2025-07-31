'use client'
import Submit from '@/components/submit'
import { Roles } from '@/lib/types'
import { formState, updateUserData } from '@/lib/users'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import Form from "next/form"


function UpdateUserContent({userData}) {
    const initialState: formState = {
        errors: {},
    }

    const id : string = userData.id
    const updateUserDataWithId = updateUserData.bind(null, id)
    
    const [state, updateFormAction, isPending] = useActionState(updateUserDataWithId, initialState)
    
    let toaster : string | React.ReactElement = ""
        useEffect(() => {

        if (state.status === 200) {
            toaster = toast.success("User Updated Successfully")
        } else if (state.status === 400) {
            toaster = toast.error("Cannot Update the User")
        }

    }, [state])

    return (
        <>
            {state?.errors?.unhandledMessage && (<p className='invalid-input-label'>{state.errors.unhandledMessage}</p>)}
            <Form action={updateFormAction} className='custom-form-styles'>
                <div className='input-container'>
                        <label htmlFor="fname">First Name <span className='text-red-400'>*</span></label>
                        <input type="text" defaultValue={state?.errors?.firstName ? state?.payload?.get("first-name") as string : state?.payload?.get("first-name") as string === undefined ? userData.firstName : state?.payload?.get("first-name") as string} name="first-name" className={`input ${state?.errors?.firstName ? "invalid-input" : "filling-input"}`} id="fname" />
                        {state?.errors?.firstName && (<p className='invalid-input-label'>{state.errors.firstName}</p>)}
                    </div>
                    <div className='input-container'>
                        <label htmlFor="lname">Last Name <span className='text-red-400'>*</span></label>
                        <input type="text" name="last-name" defaultValue={state?.errors?.lastName ? state?.payload?.get("last-name") as string : state?.payload?.get("last-name") as string === undefined ? userData.lastName : state?.payload?.get("last-name") as string} className={`input ${state?.errors?.lastName ? "invalid-input" : "filling-input"}`} id="lname" />
                        {state?.errors?.lastName && (<p className='invalid-input-label'>{state.errors.lastName}</p>)}
                    </div>
                    <div className='input-container'>
                        <label htmlFor="username">Username <span className='text-red-400'>*</span></label>
                        <input type="text" name="username" defaultValue={state?.errors?.userName ? state?.payload?.get("username") as string : state?.payload?.get("username") as string === undefined ? userData.username: state?.payload?.get("username") as string} className={`input ${state?.errors?.userName ? "invalid-input" : "filling-input"}`} id="username" />
                        {state?.errors?.userName && (<p className='invalid-input-label'>{state.errors.userName}</p>)}
                    </div>
                    <div className='input-container'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" defaultValue={userData.emailAddress} disabled={true} className={`input ${state?.errors?.email ? "invalid-input" : "filling-input"} disabled:bg-secondary-lighter disabled:cursor-not-allowed`} id="email" />
                    </div>
                    <div className='input-container col-span-2 self-center'>
                        <label htmlFor="role">Role <span className='text-red-400'>*</span></label>
                        <select name="role" defaultValue={userData.publicMetadata.role} className='px-2 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:outline-primary duration-300' id="role">
                            <option className='px-2 py-1 rounded-md' value={Roles.buyer}>Buyer</option>
                            <option className='px-2 py-1 rounded-md' value={Roles.seller}>Seller</option>
                            <option className='px-2 py-1 rounded-md' value={Roles.admin}>Admin</option>
                        </select>
                        {state?.errors?.role && (<p className='invalid-input-label'>{state.errors.role}</p>)}
                    </div>
                    <div className='col-span-2 text-center'>
                        <Submit text={"Update User"}/>
                    </div>
            </Form>
        {toaster}
        </>
    )
}

export default UpdateUserContent

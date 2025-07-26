'use client'
import Submit from '@/components/submit'
import { deleteUserClerk, formState } from '@/lib/users'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'



function DeleteUserContent({userData}) {

    const initalState: formState ={
        errors: {}
    }

    const deleteUserWithId = deleteUserClerk.bind(null,userData.id)

    const [state,deleteFormAction,isPending] = useActionState(deleteUserWithId, initalState)

    let toaster : string | React.ReactElement = ""
    
    useEffect(() => {

    if (state.status === 200) {
        toaster = toast.success("User Deleted Successfully")
    } else if (state.status === 400) {
        toaster = toast.error("Cannot Delete the User")
    }

    }, [state])

    return (
        <>
            {state.errors?.unhandledMessage && (<p className='invalid-input-label'>{state.errors.unhandledMessage}</p>)}
            <p>Are you sure you want to delete the {userData.role} {userData.username}</p>
            <form action={deleteFormAction}>
                <Submit text='delete'/>
            </form>
            {toaster}
        </>
    )
}

export default DeleteUserContent

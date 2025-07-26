import Modal from '@/components/modal'
import Submit from '@/components/submit'
import { createUserFunction, formState } from '@/lib/users'
import React, { useActionState, useEffect } from 'react'
import { Toaster } from 'sonner'
import { toast } from 'sonner'

function UserForm({handleFunction} : {handleFunction: () => void}) {


    const initialState: formState = {
        errors: {},
    }
    
    
    const [state, createFormAction, ispending] = useActionState(createUserFunction, initialState)
    
    let toaster : string | React.ReactElement = ""

    useEffect(() => {

        if (state.status === 200) {
            toaster = toast.success("User Created Successfully")
        } else if (state.status === 400) {
            toaster = toast.error("Cannot Create a User")
        }

    }, [state])
    
    return (
        <>
        <Modal headingText={"Create New User"} handleFunction={handleFunction} hasHandler={true}>
                    {state?.errors?.unhandledMessage && (<p className='invalid-input-label'>{state.errors.unhandledMessage}</p>)}
                    <form className='custom-form-styles' action={createFormAction}>
                        <div className='input-container'>
                            <label htmlFor="fname">First Name <span className='text-red-400'>*</span></label>
                            <input type="text" defaultValue={(state?.payload?.get("first-name") || "") as string} name="first-name" className={`input ${state?.errors?.firstName ? "invalid-input" : "filling-input"}`} id="fname" />
                            {state?.errors?.firstName && (<p className='invalid-input-label'>{state.errors.firstName}</p>)}
                        </div>
                        <div className='input-container'>
                            <label htmlFor="lname">Last Name <span className='text-red-400'>*</span></label>
                            <input type="text" name="last-name" defaultValue={(state?.payload?.get("last-name") || "") as string} className={`input ${state?.errors?.lastName ? "invalid-input" : "filling-input"}`} id="lname" />
                            {state?.errors?.lastName && (<p className='invalid-input-label'>{state.errors.lastName}</p>)}
                        </div>
                        <div className='input-container'>
                            <label htmlFor="username">Username <span className='text-red-400'>*</span></label>
                            <input type="text" name="username" defaultValue={(state?.payload?.get("username") || "") as string} className={`input ${state?.errors?.userName ? "invalid-input" : "filling-input"}`} id="username" />
                            {state?.errors?.userName && (<p className='invalid-input-label'>{state.errors.userName}</p>)}
                        </div>
                        <div className='input-container'>
                            <label htmlFor="email">Email <span className='text-red-400'>*</span></label>
                            <input type="email" name="email" defaultValue={(state?.payload?.get("email") || "") as string} className={`input ${state?.errors?.email ? "invalid-input" : "filling-input"}`} id="email" />
                            {state?.errors?.email && (<p className='invalid-input-label'>{state.errors.email}</p>)}
                        </div>
                        <div className='input-container'>
                            <label htmlFor="pass">Password <span className='text-red-400'>*</span></label>
                            <input type="password" name="password" defaultValue={(state?.payload?.get("password") || "") as string} className={`input ${state?.errors?.password ? "invalid-input" : "filling-input"}`} id="pass" />
                            {state?.errors?.password && (<p className='invalid-input-label'>{state.errors.password}</p>)}
                        </div>
                        <div className='input-container col-span-2 self-center'>
                            <label htmlFor="role">Role <span className='text-red-400'>*</span></label>
                            <select name="role" className='px-2 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:outline-primary duration-300' id="role">
                                <option className='px-2 py-1 rounded-md' value='buyer'>Buyer</option>
                                <option className='px-2 py-1 rounded-md' value='seller'>Seller</option>
                                <option className='px-2 py-1 rounded-md' value='admin'>admin</option>
                            </select>
                            {state?.errors?.role && (<p className='invalid-input-label'>{state.errors.role}</p>)}
                        </div>
                        <div className='col-span-2 text-center'>
                            <Submit text={"Create User"}/>
                        </div>
                    </form>
        </Modal>
        {toaster}
        </>
    )
}

export default UserForm

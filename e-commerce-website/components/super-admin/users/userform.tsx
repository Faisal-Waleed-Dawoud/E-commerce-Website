import Submit from '@/components/submit'
import { createUserFunction, formState } from '@/lib/users'
import { error } from 'console'
import React, { useActionState } from 'react'

function UserForm({handleFunction} : {handleFunction: () => void}) {


    const initialState: formState = {
        errors: {}
    }

    const [state, formAction, ispending] = useActionState(createUserFunction, initialState)
    
    return (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full bg-modal-background">
            <div className="absolute top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 bg-[#f9f9f9] shadow-custom p-3 w-full md:w-auto">
                <div className=''>
                    <div className="flex mb-4">
                        <h1 className='text-center grow text-primary-light font-semibold text-3xl'>Create New User</h1>
                        <button type='button' className='text-dangerous-light rounded-md hover:bg-dangerous-light hover:border-dangerous-light border-dangerous-lighter border-2 hover:text-white w-8 h-8 cursor-pointer duration-300 ' onClick={handleFunction}>X</button>
                    </div>
                    <form className='grid grid-cols-2 gap-3' action={formAction}>
                        <div className='input-container'>
                            <label for="fname">First Name</label>
                            <input type="text" name="first-name" className={`input ${state?.errors.firstName ? "invalid-input" : "filling-input"}`} id="fname" />
                            {state.errors.firstName && (<p className='invalid-input-label'>{state.errors.firstName}</p>)}
                        </div>
                        <div className='input-container'>
                            <label for="lname">Last Name</label>
                            <input type="text" name="last-name" className={`input ${state?.errors.firstName ? "invalid-input" : "filling-input"}`} id="lname" />
                            {state?.errors.lastName && (<p className='invalid-input-label'>{state.errors.lastName}</p>)}
                        </div>
                        <div className='input-container'>
                            <label for="username">Username</label>
                            <input type="text" name="username" className={`input ${state?.errors.firstName ? "invalid-input" : "filling-input"}`} id="username" />
                            {state?.errors.userName && (<p className='invalid-input-label'>{state.errors.userName}</p>)}
                        </div>
                        <div className='input-container'>
                            <label for="email">Email</label>
                            <input type="email" name="email" className={`input ${state?.errors.firstName ? "invalid-input" : "filling-input"}`} id="email" />
                            {state?.errors.email && (<p className='invalid-input-label'>{state.errors.email}</p>)}
                        </div>
                        <div className='input-container'>
                            <label for="phone">Phone Number</label>
                            <input type="tel" name="phone" className={`input ${state?.errors.firstName ? "invalid-input" : "filling-input"}`} id="phone" />
                            {state?.errors.phone && (<p className='invalid-input-label'>{state.errors.phone}</p>)}
                        </div>
                        <div className='input-container'>
                            <label for="pass">Password</label>
                            <input type="password" name="password" className={`input ${state?.errors.firstName ? "invalid-input" : "filling-input"}`} id="pass" />
                            {state?.errors.password && (<p className='invalid-input-label'>{state.errors.password}</p>)}
                        </div>
                        <div className='input-container'>
                            <label for="">Role</label>
                            <select name="role" id="">
                                <option value='buyer'>Buyer</option>
                                <option value='seller'>Seller</option>
                                <option value='admin'>admin</option>
                            </select>
                        </div>
                        <Submit />
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default UserForm

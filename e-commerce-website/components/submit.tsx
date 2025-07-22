'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'



function Submit() {
    const {pending} = useFormStatus()

    return (
        <button disabled={pending}>
            create User
        </button>
    )
}

export default Submit

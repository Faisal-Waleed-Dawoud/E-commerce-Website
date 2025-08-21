'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
import Button from './button'



function Submit({text, handleFunction, type='default', priority="primary", size="default"}: {text:string, handleFunction?:() => void, type?:string, priority?:string, size?:string}) {
    const {pending} = useFormStatus()

    return (
        <Button text={text} disabled={pending} handleFunction={handleFunction} type={type} priority={priority} size={size}></Button>
    )
}

export default Submit

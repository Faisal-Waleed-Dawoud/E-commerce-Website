'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
import Button from './button'



function Submit({text, handleFunction, redirect}: {text:string, handleFunction?:() => void, redirect?:boolean}) {
    const {pending} = useFormStatus()

    return (
        <Button text={text} disabled={pending} handleFunction={handleFunction}></Button>
    )
}

export default Submit

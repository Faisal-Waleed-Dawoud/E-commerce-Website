'use client'
import React from 'react'
import Spinner from './spinner'


function Button({text, handleFunction, disabled} : {text: string, handleFunction?: () => void, disabled?:boolean}) {

    return (
        <button onClick={handleFunction} disabled={disabled} className='px-3 py-2 border-primary-light border-2 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:border-primary duration-300 disabled:bg-transparent disabled:cursor-auto disabled:border-none'>
            {disabled ? <Spinner /> : text}
        </button>
    )
}

export default Button

'use client'
import React from 'react'


function Button({text, handleFunction} : {text: string, handleFunction: () => void}) {

    return (
        <button onClick={handleFunction} className='px-3 py-2 border-primary-light border-2 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:border-primary duration-300'>
            {text}
        </button>
    )
}

export default Button

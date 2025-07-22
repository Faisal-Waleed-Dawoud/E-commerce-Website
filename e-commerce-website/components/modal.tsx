"use client"
import React, { ReactNode } from 'react'



function Modal({handleFunction, children} : {handleFunction: () => void, children:React.ReactNode}) {
    return (
        <>
        <div onClick={(e) => e.stopPropagation()} className="min-h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-2xl">
            <div className="">
                <button onClick={handleFunction}>X</button>
                {children}
            </div>
        </div>
        </>
    )
}

export default Modal

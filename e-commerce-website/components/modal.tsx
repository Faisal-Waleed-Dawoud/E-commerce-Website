'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
function Modal({children, headingText, handleFunction, hasLink, hasHandler} : {children:React.ReactNode, headingText:string, handleFunction?: () => void, hasLink?: boolean, hasHandler?:boolean}) {
    
    const router = useRouter()
    
    return (
        <>
        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full bg-modal-background">
            <div className="absolute top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 bg-[#f9f9f9] shadow-custom p-3 w-full md:w-auto">
                <div>
                    <div className="flex mb-4">
                        <h1 className='text-center grow text-primary-light font-semibold text-3xl'>{headingText}</h1>
                        {hasHandler && <button type='button' className='closing-btn' onClick={handleFunction}>X</button>}
                        {hasLink && <button onClick={router.back} className='closing-btn'>X</button>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
        </>
    )
}

export default Modal

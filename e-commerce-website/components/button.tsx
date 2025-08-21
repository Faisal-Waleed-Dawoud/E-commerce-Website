'use client'
import React from 'react'
import Spinner from './spinner'


function Button({text, handleFunction, disabled, type='default', priority="primary", size="default"} : {text: string, handleFunction?: () => void, disabled?:boolean, type?:string, priority?:string, size?:string}) {

    const styles = {
        type: {
            priority: {
                primary: {
                    default: "bg-primary hover:bg-primary-dark text-white button-style",
                    dangerous: "bg-dangerous hover:bg-dangerous-dark text-white button-style",
                    alert: "bg-alert hover:bg-alert-dark text-[#444] hover:text-white button-style",
                },
                secondary: {
                    default: "border-primary-light hover:bg-primary border-2 hover:text-white hover:border-primary button-style",
                    dangerous: "border-dangerous-light hover:bg-dangerous border-2 hover:text-white hover:border-dangerous button-style",
                    alert: "border-alert-light hover:bg-alert hover:text-white border-2 hover:border-alert button-style"
                }
            }
        }, 
        size: {
            default: "px-3 py-2 rounded-md"
        }
    }

    return (
        <button onClick={handleFunction} disabled={disabled} className={` ${styles.type.priority[priority][type]} ${styles.size[size]}`}>
            {disabled ? <Spinner /> : text}
        </button>
    )
}

export default Button

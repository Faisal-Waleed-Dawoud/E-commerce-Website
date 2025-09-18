'use client'
import React from 'react'
import Spinner from './spinner'
import LaunchIcon from '@mui/icons-material/Launch';


function Button({text, handleFunction, disabled, type='default', priority="primary", size="default", icon} : {text: string, handleFunction?: () => void, disabled?:boolean, type?:string, priority?:string, size?:string, icon?: string}) {

    const icons = {
        
    }

    const styles = {
        type: {
            priority: {
                primary: {
                    default: "primary-btn-colors",
                    dangerous: "dangerous-btn-colors",
                    alert: "alert-btn-colors",
                },
                secondary: {
                    default: "outlined-btn-primary",
                    dangerous: "outlined-btn-dangerous",
                    alert: "outlined-btn-alert"
                }
            }
        }, 
        size: {
            default: "px-3 py-2 rounded-md"
        }
    }

    return (
        <>
        <button onClick={handleFunction} disabled={disabled} className={`${styles.type.priority[priority][type]} ${styles.size[size]} duration-300 disabled:bg-transparent cursor-pointer disabled:cursor-auto disabled:border-none`}>
            {disabled ? <Spinner /> : icons[icon]} {!disabled && text}
        </button>
        </>
    )
}

export default Button

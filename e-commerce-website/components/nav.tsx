'use client'
import React, { useState } from 'react'
import NavigationLinks from './navigationLinks'
import { useTranslations } from 'next-intl'
import NavigationBurger from './navigationBar'



function Nav({role, lang} : {role:string, lang:string}) {

    const tHome = useTranslations("HomePage")

    const [open, setOpen] = useState(false)

    function handleOpen() {
        setOpen(!open)
    }

    return (
        <div className='flex gap-8'>
            <div className='flex justify-between w-full md:w-auto items-center'>
                <h1>{tHome("title")}</h1>
                <NavigationBurger handleOpen={handleOpen}/>
            </div>
            <NavigationLinks open={open} handleOpen={handleOpen} role={role} lang={lang}/>
        </div>
    )
}

export default Nav

import React from 'react'
import Container from './container'
import { cookies } from 'next/headers'
import { currentUserRouteRole } from '@/lib/utils'
import Nav from './nav'



async function Header() {

    const role = await currentUserRouteRole();

    const cookie = await cookies()

    const lang = cookie.get("locale")?.value || "en"

    return (
        <header className='bg-[#f9f9f9] shadow-custom sticky top-0 left-0'>
            <Container classes='py-3'>
                <Nav role={role} lang={lang}/>
            </Container>
        </header>
    )
}

export default Header

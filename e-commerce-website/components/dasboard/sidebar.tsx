import React from 'react'
import Links from './links'
import { SignOutButton } from '@clerk/nextjs'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


function Sidebar({role}) {

    return (
        <div className='min-h-[100vh] bg-[#f9f9f9] p-3 md:w-[180px] flex justify-between flex-col'>
            <Links role={role}/>
            <SignOutButton>
                <button className='text-left text-dangerous p-2 cursor-pointer duration-300 hover:bg-dangerous-lighter rounded-md'><ExitToAppIcon /><span className='md:inline hidden'>Sign Out</span></button>
            </SignOutButton>
        </div>
    )
}

export default Sidebar

'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LaunchIcon from '@mui/icons-material/Launch';



function ControlBtns({ mainBtnLink, mainBtnTitle, controlBtnLink, controlBtnTitle }: {
    mainBtnLink: string,
    mainBtnTitle: string,
    controlBtnLink: string,
    controlBtnTitle: string
}) {

    const [open, setOpen] = useState(false)



    return (

        <div className='flex items-center'>
            <Link href={mainBtnLink} className='primary-btn-colors px-3 py-2 rounded-l-lg flex items-center gap-2'>
                <LaunchIcon />
                <span>{mainBtnTitle}</span>
            </Link>
            <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="relative px-3 py-1 border-2 border-[#bbb] duration-300 h-[40px] rounded-r-lg cursor-pointer hover:bg-[#eee]">
                <MoreVertIcon />
                <div className={`${open ? "flex" : "hidden"} bg-white shadow-custom w-3xs p-3 flex-col absolute top-full right-0 animate-slide-up`}>
                    <Link href={controlBtnLink} target='_blank'>
                        <LaunchIcon />
                        {controlBtnTitle}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ControlBtns

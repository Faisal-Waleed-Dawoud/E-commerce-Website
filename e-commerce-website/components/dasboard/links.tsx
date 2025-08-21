'use client'
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShopIcon from '@mui/icons-material/Shop';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import {clsx} from "clsx"


function Links({role}) {
    

    const Links = {
        buyer : [
            {name: "Dashboard", icon: <DashboardIcon />, url: "/buyer"},
            {name: "Orders", url:"/buyer/orders"},
            {name: "Stores", url:"/buyer/stores"}
        ], 
        seller : [
            {name: "Dashboard", icon: <DashboardIcon />, url: "/seller"},
            {name: "Store", icon: <StoreIcon />, url:"/seller/store"},
            {name: "Orders", icon: <ShopIcon />, url:"/seller/orders"}
        ], 
        admin : [
            {name: "Dashboard", icon: <DashboardIcon />, url: "/admin"},
            {name: "Sellers", icon: <RealEstateAgentIcon />, url:"/admin/sellers"},
            {name: "Stores", icon: <StoreIcon />, url:"/admin/stores-admin"}
        ],
        super_admin : [
            {name: "Dashboard", icon: <DashboardIcon />, url: "/super-admin"},
            {name: "Users", icon: <GroupIcon />, url:"/super-admin/users"},
            {name: "Stores", icon: <StoreIcon />, url:"/super-admin/stores"}
        ]
    }



    const path = usePathname()

    return (
        <ul className='flex flex-col gap-2'>
            {Links[role].map((link) => {
                const isActiveLink = path === link.url
                return (
                <li key={link.name} className= {clsx('text-secondary-dark rounded-md hover:text-primary-light hover:bg-secondary-lighter p-2 cursor-pointer duration-300', {
                    "bg-secondary-lighter" : isActiveLink === true
                })}>
                    <Link href={link.url} className={clsx('w-full block', {
                        "text-primary-light" : isActiveLink === true
                    })}>{link.icon} <span className='hidden md:inline'>{link.name}</span></Link>
                </li>
            )})}
        </ul>
    )
}

export default Links

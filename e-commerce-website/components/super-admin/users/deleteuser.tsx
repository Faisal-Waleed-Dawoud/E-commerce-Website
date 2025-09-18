'use client'
import Modal from '@/components/modal'
import React, { useState } from 'react'
import DeleteUserContent from './deleteUserContent'
import Button from '@/components/button'
import { User } from '@clerk/nextjs/server'


function Deleteuser({userData} : {userData: User}) {
    

    const [open, setIsOpen] = useState(false)

    function handleOpen() {
        setIsOpen(!open)
    }

    return (
        <>
        {open && 
        <Modal headingText='Delete User' hasHandler={true} handleFunction={handleOpen}>
            <DeleteUserContent userData={userData}/>
        </Modal>}
        <Button text='delete' type='dangerous' priority='secondary' handleFunction={handleOpen}/>
        </>
    )
}

export default Deleteuser

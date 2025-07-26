'use client'
import Modal from '@/components/modal'
import React, { useState } from 'react'
import DeleteUserContent from './deleteUserContent'
import Button from '@/components/button'


function Deleteuser({userData} : {userData: any}) {
    

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
        <Button text='delete' handleFunction={handleOpen}/>
        </>
    )
}

export default Deleteuser

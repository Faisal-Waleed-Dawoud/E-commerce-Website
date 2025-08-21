'use client'
import Modal from '@/components/modal'
import React, { useState } from 'react'
import UpdateUserContent from './updateUserContent'
import Button from '@/components/button'



function UpdateUserForm({userData} : {userData: any}) {

    const [open, setIsOpen] = useState(false)

    function handleOpen() {
        setIsOpen(!open)
    }
    
    return (
        <>
        {open && <Modal headingText='Update User' hasHandler={true} handleFunction={handleOpen}>
            <UpdateUserContent userData={userData}/>
        </Modal>}
        <Button text='update' type='alert' priority='secondary' handleFunction={handleOpen}/>
        </>
    )
}

export default UpdateUserForm

'use client'
import Button from '@/components/button';
import Modal from '@/components/modal';
import React, { useState } from 'react'
import CreateStoreForm from './createStoreForm';


function CreateStore({sellerId} : {sellerId:string}) {

    const [open, setOpen] = useState(false);

    function handleOpen() {
    setOpen(!open);
}
    

    return (
        <>
            {open && <Modal headingText='Create Store' hasHandler={true} handleFunction={handleOpen}>
                <CreateStoreForm sellerId={sellerId}/>
                </Modal>}
            <Button text="Create One" handleFunction={handleOpen} />
        </>
    )
}

export default CreateStore

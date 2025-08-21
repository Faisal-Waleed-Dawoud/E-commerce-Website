import { Skeleton } from '@mui/material'
import React from 'react'


function Loading() {

    return (
        <>
            <Skeleton  variant="rectangular" animation="wave" height={396} className='w-full rounded-md'/>
        </>
    )
}

export default Loading

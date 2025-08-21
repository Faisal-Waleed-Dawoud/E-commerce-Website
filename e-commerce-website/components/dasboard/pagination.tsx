'use client'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import React from 'react'



function Pagination({pageNumber, pageLimit} : {pageNumber: number, pageLimit:number}) {
    const route = useRouter()
    
    function onPageChange(newPage:number) {
        const params = new URLSearchParams(window.location.search)
        params.set("page",newPage.toString())
        route.push(`${window.location.pathname}?${params}`)
    }
    const start = (+pageNumber === 1 )
    const end = +pageNumber >= pageLimit



    
    return (
        <div className='flex justify-between items-center'>
            <button className='pagination-arrow' disabled={start} onClick={() => onPageChange(+pageNumber-1)}><ArrowBack /></button>
                <div className='flex gap-2 items-end'>
                    {!start && (
                        <>
                        {+pageNumber !== 2 && (
                            <>
                            <button className='pagination-item' onClick={()=>onPageChange(1)}>1</button>
                            <span>. . .</span>
                            </>)}
                        <button className='pagination-item' onClick={()=>onPageChange(+pageNumber - 1)}>{+pageNumber - 1}</button>
                        </>
                        )}
                    <button onClick={()=>onPageChange(+pageNumber)} className={`bg-primary text-white py-1 px-2 rounded-md cursor-pointer`}>
                        {pageNumber}
                    </button>
                    {!end && (
                        <>
                        <button className='pagination-item' onClick={()=>onPageChange(+pageNumber + 1)}>{+pageNumber + 1}</button>
                        {+pageNumber <= pageLimit - 2 && (
                            <>
                            <span>. . .</span>
                            <button className='pagination-item' onClick={()=>onPageChange(pageLimit)}>{pageLimit}</button>
                            </>
                        )}
                        </>
                    )}
                </div>
            <button className='pagination-arrow' disabled={end} onClick={() => onPageChange(+pageNumber+1)}><ArrowForward /></button>
        </div>
    )
}

export default Pagination

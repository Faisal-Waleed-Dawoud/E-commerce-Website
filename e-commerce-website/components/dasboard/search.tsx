import Form from 'next/form'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';


function Search({location, placedText} : {location: string, placedText:string}) {


    return (
        <>
            <Form action={location}>
                <label htmlFor="query-input" className='bg-white px-3 py-1 flex items-center outline-2 focus-within:outline-4 duration-300 outline-primary-lighter justify-between rounded-md'>
                    <input type="text" className='outline-none focus:outline-none' name="query" id="query-input" placeholder={placedText}/>
                    <button type="submit" className='cursor-pointer hover:text-primary duration-300'><SearchIcon /></button>
                </label>
            </Form>
        </>
    )
}

export default Search

'use client'
import { useRouter } from 'next/navigation'
import React, {useState } from 'react'


function LanguageSwitcher({lang}: {lang:string}) {

    const [selectedLang, setSelectedLang] = useState(lang)

    const route = useRouter()

    const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        document.cookie = `locale=${e.target.value}`
        setSelectedLang(e.target.value)
        route.refresh()
    }
    

    return (
        <>
            <select name="language" id="lang" value={selectedLang} onChange={handleLangChange}>
                <option value="ar">العربية</option>
                <option value="en">English</option>
            </select>
        </>
    )
}

export default LanguageSwitcher

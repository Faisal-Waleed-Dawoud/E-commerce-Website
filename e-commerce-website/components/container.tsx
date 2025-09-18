import React from 'react'

function Container({classes, children} : {classes?:string, children: React.ReactNode}) {


    return (
        <div className={`${classes} md:w-[750px] lg:w-[970px] xl:w-[1170px] px-[15px] mx-auto`}>
            {children}
        </div>
    )
}

export default Container

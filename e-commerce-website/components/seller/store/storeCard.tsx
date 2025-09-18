import React from "react";
import IKImage from '@/components/IKImage'
import ControlBtns from "@/components/dasboard/controlBtns";

function StoreCard({storeLogo, storeName, mainBtnLink, mainBtnTitle, controlBtnLink, controlBtnTitle}: {storeLogo: string, storeName: string, mainBtnLink:string, mainBtnTitle: string, controlBtnLink: string, controlBtnTitle: string}) {
    return (
        <div className="px-3 py-1 shadow-custom rounded-lg flex md:flex-row flex-col justify-between items-center">
            <div className="flex gap-2 items-center">
                <IKImage
                    url={storeLogo}
                    alt="Store Logo"
                    width={100}
                    height={100}
                />
                <div className="">
                    <h3>{storeName}</h3>
                </div>
            </div>
            <ControlBtns mainBtnLink={mainBtnLink} mainBtnTitle={mainBtnTitle} controlBtnLink={controlBtnLink} controlBtnTitle={controlBtnTitle}/>
        </div>
    );
}

export default StoreCard;

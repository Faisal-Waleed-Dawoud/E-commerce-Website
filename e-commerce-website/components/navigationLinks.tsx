import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import LanguageSwitcher from "./languageSwitcher";
import { useTranslations } from "next-intl";


function NavigationLinks({open, handleOpen, role, lang} : {open: boolean, handleOpen: () => void, role:string, lang:string}) {

    const t = useTranslations("NavigationLinks")

    const Links = [
        { name: `${t("Home")}`, url: `/` },
        { name: `${t("Stores")}`, url: `/stores`},
        { name: `${t("Products")}`, url: `/products`},
    ];
    

    return (
            <nav className={`${open ? "mobile-nav" : "normal-nav"}`}>
                {open && <button onClick={handleOpen} className="self-start w-9 h-9 rounded-full text-2xl cursor-pointer duration-300 bg-primary-light hover:bg-primary">
                    X
                </button>}
                <ul className={`${open ? "flex-col" : ""} flex gap-2 items-center`}>
                    {Links.map((link) => (
                        <li key={link.name}>
                            <Link target="_blank" className="nav-link" href={link.url}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                <ul className={`${open ? "flex-col" : ""} flex gap-2 items-center`}>
                    <li>
                        <LanguageSwitcher lang={lang}/>
                    </li>
                    <li>
                        <SignedOut>
                            <div className="nav-link">
                                <SignInButton mode="modal">
                                    {t("SignIn")}
                                </SignInButton>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <div className={`${open ? "flex-col" : ""} flex gap-2 items-center`}>
                                <Link href={`/${role}`} className="nav-link" target="_blank">{t("Dashboard")}</Link>
                                <div className="nav-link">
                                    <SignOutButton>
                                        {t("SignOut")}
                                    </SignOutButton>
                                </div>
                            </div>
                        </SignedIn>
                    </li>
                </ul>
            </nav>
    )
}

export default NavigationLinks

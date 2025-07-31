import { currentUserRouteRole } from "@/lib/utils";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

async function NavLinks() {
    const role = await currentUserRouteRole();

    const Links = [{ name: "Home", url: `/` }];

    return (
        <>
            <ul>
                {Links.map((link) => (
                    <li key={link.name}>
                        <Link href={link.url}>{link.name}</Link>
                    </li>
                ))}
                <li>
                    <SignedOut>
                        <SignInButton mode="modal" />
                    </SignedOut>
                    <SignedIn>
                        <Link href={`/${role}`}>Dashboard</Link>
                        <SignOutButton></SignOutButton>
                    </SignedIn>
                </li>
            </ul>
        </>
    );
}

export default NavLinks;

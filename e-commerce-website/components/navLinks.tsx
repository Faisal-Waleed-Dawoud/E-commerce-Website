import { SignedIn, SignedOut, SignInButton, SignOutButton} from '@clerk/nextjs'
import { auth, clerkClient } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

async function NavLinks() {

    const {userId} = await auth()

    let role = ""

    if (userId !== null) {
        role = (await (await clerkClient()).users.getUser(userId)).publicMetadata
    }

    const Links = [
        {name: "Home", url: `/`},
    ]

    return (
        <>
            <ul>
                {Links.map(link => (
                    <li key={link.name}>
                        <Link href={link.url}>{link.name}</Link>
                    </li>
                ))}
                <li>
                    <SignedOut>
                        <SignInButton mode='modal' />
                    </SignedOut>
                    <SignedIn>
                        <Link href={`/${role.role}`}>Dashboard</Link>
                        <SignOutButton>
                        </SignOutButton>
                    </SignedIn>
                </li>
            </ul>
        </>
    )
}

export default NavLinks

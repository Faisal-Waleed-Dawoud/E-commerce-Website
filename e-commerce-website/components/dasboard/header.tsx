import { capitlizeFirstLetter } from "@/lib/utils";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import React from "react";

async function Header() {
    const { userId } = await auth();
    const { users } = await clerkClient();
    let userName = (await users.getUser(userId)).username;
    let firstName = (await users.getUser(userId)).firstName;
    let lastName = (await users.getUser(userId)).lastName;
    let role = (await users.getUser(userId)).publicMetadata.role;

    userName = capitlizeFirstLetter(userName);
    firstName = capitlizeFirstLetter(firstName);
    lastName = capitlizeFirstLetter(lastName);
    let fullName = firstName + " " + lastName;

    return (
        <>
            <header className="flex justify-between items-center mb-6">
                <h2>Welcome {userName ? userName : fullName}</h2>
                <div>
                    <div className="flex gap-2">
                        <div className="text-center">
                            <p className="font-semibold textsm">{fullName}</p>
                            <p className="font-light">{role}</p>
                        </div>
                        <UserButton />
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;

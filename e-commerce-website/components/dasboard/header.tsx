import { getUser } from "@/lib/actions/users";
import { authUserId, capitlizeFirstLetter } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import React from "react";

async function Header() {
    const userId = await authUserId();
    
    let {username, firstName, lastName, publicMetadata: {role}} = await getUser(userId) as User

    username = capitlizeFirstLetter(username);
    firstName = capitlizeFirstLetter(firstName);
    lastName = capitlizeFirstLetter(lastName);
    let fullName = firstName + " " + lastName;

    return (
        <>
            <header className="flex justify-between items-center mb-6">
                <h2>Welcome {username ? username : fullName}</h2>
                <div>
                    <div className="flex gap-2">
                        <div className="text-center">
                            <p className="font-semibold textsm">{fullName}</p>
                            <p className="font-light">{role}</p>
                        </div>
                        <div className="grow w-10 h-10 flex items-center justify-center">
                            <UserButton />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;

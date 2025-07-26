import Createuser from "@/components/super-admin/users/createuser";
import { formatDate } from "@/lib/utils";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import Deleteuser from "./deleteuser";
import UpdateUserForm from "./updateUserForm";

async function Userstable() {
    const {userId} = await auth()
    const {publicMetadata} = await (await clerkClient()).users.getUser(userId)
    const userRole = publicMetadata.role
    const { users } = await clerkClient();
    const userList = (await users.getUserList()).data;
    return (
        <>
            <div className="bg-[#f9f9f9] rounded-md p-3 shadow-custom overflow-x-auto ">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl mb-3">Users</h1>
                    <div>
                        <Createuser buttonText="+ New User"/>
                    </div>
                </div>
                <table className="table">
                    <thead className="table-header-group">
                        <tr className="table-row">
                            <th className="font-semibold px-3 py-2">Profile Image</th>
                            <th className="font-semibold px-3 py-2">Username</th>
                            <th className="font-semibold px-3 py-2">Email</th>
                            <th className="font-semibold px-3 py-2">Role</th>
                            <th className="font-semibold px-3 py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => {
                            const {
                                id,
                                firstName,
                                lastName,
                                imageUrl,
                                username,
                                primaryEmailAddressId,
                                emailAddresses,
                                createdAt,
                                publicMetadata,
                            } = user;
                            const { emailAddress } = emailAddresses.find(
                                (email) => email.id === primaryEmailAddressId
                            );
                            const formattedCreatedAt = formatDate(createdAt);
                            return (
                                <tr
                                    key={id}
                                    className="nth-last-[n]:border-b border-b-secondary-lighter nth-[even]:bg-[#f9f9f9]"
                                >
                                    <td className="table-custom-cell">
                                        <Image
                                            alt="user-profile"
                                            className="rounded-full mx-auto"
                                            width={40}
                                            height={40}
                                            src={imageUrl ? imageUrl : "/public/user-image.webp"}
                                        />
                                    </td>
                                    <td className="table-custom-cell">{username}</td>
                                    <td className="table-custom-cell">{emailAddress}</td>
                                    <td className="table-custom-cell">{publicMetadata.role}</td>
                                    <td className="table-custom-cell border-r border-r-secondary-lighter">
                                        {formattedCreatedAt}
                                    </td>
                                    {userRole === publicMetadata.role && userId !== id ? null :<td><UpdateUserForm userData={{id,firstName, lastName, username, emailAddress, publicMetadata}}/></td>}
                                    {publicMetadata.role !== userRole && <td><Deleteuser userData={{id, username, publicMetadata}}/></td>}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Userstable;

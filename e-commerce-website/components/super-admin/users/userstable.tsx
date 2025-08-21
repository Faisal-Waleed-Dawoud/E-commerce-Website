import Createuser from "@/components/super-admin/users/createuser";
import { formatDate } from "@/lib/utils";
import { currentUser, User } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import Deleteuser from "./deleteuser";
import UpdateUserForm from "./updateUserForm";
import Search from "@/components/dasboard/search";
import Pagination from "@/components/dasboard/pagination";

async function Userstable({page, pageLimit, userList} : {page:number, pageLimit:number, userList: User[]}) {
    const user = await currentUser()
    const {id: userId, publicMetadata:{role}} = user

    if ((+page > pageLimit) || (+page < 1)) {
        return (
            <p>Data Not Found</p>
        )
    }

    return (
        <>
            <div className="bg-[#f9f9f9] rounded-md p-3 shadow-custom overflow-x-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl mb-3">Users</h1>
                    <div className="flex gap-2 items-center">
                        <Search location={"/super-admin/users"} placedText={"Search for users..."} />
                        <Createuser buttonText="+ New User" />
                    </div>
                </div>
                <table className="table mb-3">
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
                                            src={imageUrl ? imageUrl : "/user-image.webp"}
                                        />
                                    </td>
                                    <td className="table-custom-cell">{username}</td>
                                    <td className="table-custom-cell">{emailAddress}</td>
                                    <td className="table-custom-cell">{publicMetadata.role}</td>
                                    <td className="table-custom-cell border-r border-r-secondary-lighter">
                                        {formattedCreatedAt}
                                    </td>
                                    <td className="flex gap-2 items-center p-2">
                                    {role === publicMetadata.role && userId !== id ? null : (
                                        <td>
                                            <UpdateUserForm
                                                userData={{
                                                    id,
                                                    firstName,
                                                    lastName,
                                                    username,
                                                    emailAddress,
                                                    publicMetadata,
                                                }}
                                            />
                                        </td>
                                    )}
                                    {publicMetadata.role !== role && (
                                        <td>
                                            <Deleteuser userData={{ id, username, publicMetadata }} />
                                        </td>
                                    )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination pageNumber={page} pageLimit={pageLimit}/>
            </div>
        </>
    );
}

export default Userstable;

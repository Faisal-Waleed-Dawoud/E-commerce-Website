import Createuser from "@/components/super-admin/users/createuser";
import { currentUser, User } from "@clerk/nextjs/server";
import React from "react";
import Search from "@/components/dasboard/search";
import Pagination from "@/components/dasboard/pagination";
import UserInfo from "@/components/dasboard/userInfo";

async function Userstable({page, pageLimit, userList} : {page:number, pageLimit:number, userList: User[]}) {
    const user = await currentUser()
    const {id: userId, publicMetadata:{role}} = user as User

    if ((+page > pageLimit) || (+page < 1)) {
        return (
            <p>Data Not Found</p>
        )
    }
    const users = []
    for (let index = 0; index < userList.length; index++) {
        users.push(<UserInfo currentUserId={userId} currentUserRole={role} user={userList[index]}/>)
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
                        {users}
                    </tbody>
                </table>
                <Pagination pageNumber={page} pageLimit={pageLimit}/>
            </div>
        </>
    );
}

export default Userstable;

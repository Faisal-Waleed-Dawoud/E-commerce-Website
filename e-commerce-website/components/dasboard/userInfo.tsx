import { Image } from '@imagekit/next'
import React from 'react'
import UpdateUserForm from '../super-admin/users/updateUserForm'
import Deleteuser from '../super-admin/users/deleteuser'
import { EmailAddress, User } from '@clerk/nextjs/server'
import { formatDate } from '@/lib/utils'
import IKImage from '../IKImage'

function UserInfo({user, currentUserRole, currentUserId} : {user: User, currentUserRole: string, currentUserId: string}) {
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
    ) as EmailAddress;
    
    const formattedCreatedAt = formatDate(createdAt);

    return (
        <tr
            className="border-b border-b-secondary-lighter nth-[even]:bg-[#f9f9f9]"
        >
            <td className="table-custom-cell">
                <IKImage
                    alt="user-profile"
                    className="rounded-full mx-auto"
                    width={40}
                    height={40}
                    url={imageUrl ? imageUrl : "/user-image.webp"}
                />
            </td>
            <td className="table-custom-cell">{username}</td>
            <td className="table-custom-cell">{emailAddress}</td>
            <td className="table-custom-cell">{publicMetadata.role}</td>
            <td className="table-custom-cell">
                {formattedCreatedAt}
            </td>
            <td className="flex gap-2 items-center p-2">
            {currentUserRole === publicMetadata.role && currentUserId !== id ? null : (
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
            {publicMetadata.role !== currentUserRole && (
                <td>
                    <Deleteuser userData={{ id, username, publicMetadata }} />
                </td>
            )}
            </td>
        </tr>
    )
}

export default UserInfo

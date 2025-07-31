import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { Roles } from './lib/types';



const isSuperAdmin = createRouteMatcher(["/super-admin(.*)"])
const isAdmin = createRouteMatcher(["/admin(.*)"])
const isSeller = createRouteMatcher(["/seller(.*)"])
const isBuyer = createRouteMatcher(["/buyer(.*)"])
const isPublicRoute = createRouteMatcher(["/", "/about-us", "/products(.*)", "/stores(.*)", "/contact-us(.*)", "/not-found", "/api/webhooks(.*)"])

export default clerkMiddleware(async(auth, req) => {
    const {userId, redirectToSignIn} = await auth()

    if (!userId && !isPublicRoute(req)) {
        return redirectToSignIn()
    }

    let role = ""
    if (userId) {
        const {publicMetadata} = await (await clerkClient()).users.getUser(userId)
        role = publicMetadata.role
    }


    if (role !== Roles.super_admin && isSuperAdmin(req)) {
        return notFound()
    }
    if (role !== Roles.admin && isAdmin(req)) {
        return notFound()
    }
    if (role !== Roles.seller && isSeller(req)) {
        return notFound()
    }
    if (role !== Roles.buyer && isBuyer(req)) {
        return notFound()
    }

})


export const config = {
    matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    ],
};
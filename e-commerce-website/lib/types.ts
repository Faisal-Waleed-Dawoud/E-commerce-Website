// Describing the product property for type safety, 
// These properties should match with the DB schema
export type Product = {
    name: string,
    description: string,
    price: number,
    countitiy: number,
}

export type Store = {
    name: string,
    owner: string,
    createdDate: Date,
}

export type User = {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    email:string,
    store?: Store,
    clerkUserId: string,
    role: Roles,
    createdAt: number
}

// This enum is used accross the forms and application and its values indicates the user role
// which is saved in clerk and the DB
// the super_admin is modified in utils to match the super-admin routes
export enum Roles {
    super_admin = "super_admin",
    admin = "admin",
    seller = "seller", 
    buyer = "buyer",
}

export const MAX_NUMBERS_PER_PAGE = 5
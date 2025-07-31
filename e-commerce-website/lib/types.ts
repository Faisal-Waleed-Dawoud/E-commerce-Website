// Describing the product property for type safety, 
// These properties should match with the DB schema
export type Product = {
    name: string,
    description: string,
    price: number,
    countitiy: number,
}

export type Sotre = {
    name: string,
    owner: string,
    createdDate: Date,
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

export {}

export type Roles = "buyer" | "seller" | "admin" | "super-admin"

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}

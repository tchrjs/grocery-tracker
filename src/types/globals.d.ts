export {};

// Create a type for the roles
export type Roles = "admin" | "moderator" | "viewer";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      sentRequest?: boolean;
    };
  }
}

import NextAuth from "next-auth/next"
import { authOptions } from "./options"

const routeHandler = NextAuth(authOptions)

export { routeHandler as GET, routeHandler as POST }

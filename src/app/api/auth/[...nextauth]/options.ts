import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import bcrypt from "bcryptjs"
import connectDb from "@/lib/connectDb"
import { userModel } from "@/models/models"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDb()
        try {
          const user = await userModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          })
          if (!user) {
            throw new Error("User not found")
          }

          if (!user.isVerified) {
            throw new Error("User not found")
          }
          const isPasswordMatched = await bcrypt.compare(
            credentials.password,
            user.password
          )
          if (!isPasswordMatched) {
            throw new Error("Password is incorrect!")
          } else {
            return user
          }
        } catch (error: any) {
          throw new Error(error)
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
}

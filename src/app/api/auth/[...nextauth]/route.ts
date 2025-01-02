// src/app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Custom user authentication logic (replace this with database logic)
const authenticateUser = async (username, password) => {
  // Example user, replace this with your own DB lookup
  const user = {
    id: 1,
    name: "John Doe",
    username: "john",
    password: "password123",
  }

  if (username === user.username && password === user.password) {
    return { id: user.id, name: user.name }
  }
  return null
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        const user = await authenticateUser(
          credentials.username,
          credentials.password
        )
        if (user) {
          return user
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
})

export { handler as GET, handler as POST }

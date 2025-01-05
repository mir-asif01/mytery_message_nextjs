"use client"
import { SessionProvider } from "next-auth/react"

export default function Next_auth_SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}

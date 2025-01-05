"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button
        className="bg-violet-600 rounded-md px-3 py-1 font-semibold text-white"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  )
}

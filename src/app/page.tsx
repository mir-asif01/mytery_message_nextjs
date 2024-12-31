import { z } from "zod"

const userSchema = z.object({
  firstName: z.string(),
  email: z.string().email(),
  age: z.number().min(18).optional(),
  friends: z.array(z.string()).max(3),
  settings: z.object({
    isSubscribed: z.boolean(),
  }),
})

type User = z.infer<typeof userSchema>

const user: User = {
  firstName: "asif",
  email: "asif@gmail.com",
  age: 21,
  friends: ["f-1", "f-3", "f-4"],
  settings: {
    isSubscribed: false,
  },
}

const is = userSchema.safeParse(user)
console.log(is)

export default function Home() {
  return (
    <div>
      <h1 className="text-center">hello mystery message</h1>
    </div>
  )
}

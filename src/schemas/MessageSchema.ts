import { z } from "zod"

export const MessageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content's length must be atleast of 10 characters" })
    .max(300, {
      message: "Content's length must be less than of 300 characters",
    }),
})

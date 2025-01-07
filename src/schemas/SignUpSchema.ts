import { z } from "zod"

export const usernameValidation = z
  .string()
  .min(4, { message: "Username must be atleast of 5 characters" })
  .max(100, { message: "Username must be less of 100 characters or less" })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "Username must not contain special characters",
  })

export const SignUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Passwords length must be more than 6" })
    .regex(/^(?=.*[^a-zA-Z0-9]).+$/, {
      message: "Password must contain at least one special character",
    }),
})

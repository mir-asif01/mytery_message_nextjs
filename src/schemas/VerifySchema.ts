import { z } from "zod"

export const VerifySchema = z.object({
  code: z.string().length(4, { message: "Verify code's length must be 4" }),
})

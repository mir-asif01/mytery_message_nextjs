import { boolean, z } from "zod"

export const AcceptingMessageSchema = z.object({
  isAcceptingMessages: z.boolean(),
})

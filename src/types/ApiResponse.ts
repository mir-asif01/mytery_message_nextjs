import { Message } from "@/models/models"

export interface ApiResponse {
  success: boolean
  message: string
  isAcceptingMessages?: boolean
  messages?: Array<Message>
}

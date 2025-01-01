import mongoose, { Schema, Document } from "mongoose"

export interface Message extends Document {
  content: string
  createdAt: Date
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

export const messageModel = mongoose.model("messages", messageSchema)

export interface User extends Document {
  username: string
  email: string
  password: string
  verifyCode: string
  verifyCodeExpiry: Date
  isVerified: boolean
  isAcceptingMessages: boolean
  messages: Message[]
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+ /, "Email address"],
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "VerifyCode expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: false,
  },
  messages: [messageSchema],
})

export const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("user", userSchema)

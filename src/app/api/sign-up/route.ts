import { userModel } from "@/models/models"
import connectDb from "@/lib/connectDb"
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"

export async function POST(req: Request) {
  await connectDb()
  try {
    const { email, username, password } = await req.json()
    const existingUserWithUsernameIsVerified = await userModel.findOne({
      username,
      isVerified: true,
    })
    if (existingUserWithUsernameIsVerified) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      )
    }
    const existingUserWithEmail = await userModel.findOne({ email })
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getHours() + 1)

    const OTP = Math.floor(1000 + Math.random() * 9000).toString()

    if (existingUserWithEmail) {
      if (existingUserWithEmail.isVerified) {
        return Response.json(
          { success: false, message: "Email is already used" },
          { status: 401 }
        )
      } else {
        const hashedPassword = await bcrypt.hash(password, 9)

        existingUserWithEmail.password = hashedPassword
        existingUserWithEmail.verifyCodeExpiry = expiryDate
        existingUserWithEmail.verifyCode = OTP

        await existingUserWithEmail.save()
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 9)

      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        verifyCode: OTP,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      })
      await newUser.save()
    }

    const emailResponse = await sendVerificationEmail(email, username, OTP)

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      )
    }

    return Response.json(
      {
        success: true,
        message: "User register successfully. Verify your accout.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.log("Error while user sign-up", error)
    return Response.json(
      { succees: false, message: "User sign-up error" },
      { status: 500 }
    )
  }
}

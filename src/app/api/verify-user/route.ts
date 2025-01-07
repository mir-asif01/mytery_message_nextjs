import connectDb from "@/lib/connectDb"
import { UserModel } from "@/models/models"

export default async function POST(req: Request) {
  await connectDb()
  try {
    const { username, code } = await req.json()
    const decodedUsername = decodeURIComponent(username)

    const user = await UserModel.findOne({ username: decodedUsername })
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 400 }
      )
    }

    const isVerificationCodeCorrect = user.verifyCode === code
    const isExpiryDateNotOver = new Date(user.verifyCodeExpiry) > new Date()

    if (isVerificationCodeCorrect && isExpiryDateNotOver) {
      user.isVerified = true
      return Response.json(
        { success: true, message: "User verified successfully" },
        { status: 200 }
      )
    } else if (!isVerificationCodeCorrect) {
      return Response.json(
        { success: false, message: "Verification code is incorrect" },
        { status: 400 }
      )
    } else {
      return Response.json(
        {
          success: false,
          message: "Verification code si expired, please sign-up again",
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.log("error while code verification", error)
    return Response.json(
      { success: false, message: "Error while verifying user" },
      { status: 500 }
    )
  }
}

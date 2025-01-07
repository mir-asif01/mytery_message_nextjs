import connectDb from "@/lib/connectDb"
import { UserModel } from "@/models/models"
import { z } from "zod"
import { usernameValidation } from "@/schemas/SignUpSchema"

const usernameQuerySchema = z.object({
  username: usernameValidation,
})

export async function GET(req: Request) {
  await connectDb()
  try {
    const { searchParams } = new URL(req.url)
    const queryParam = {
      username: searchParams.get("username"),
    }
    const result = usernameQuerySchema.safeParse(queryParam)
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || []

      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Username is invalid",
        },
        { status: 401 }
      )
    }

    const { username } = result.data

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    })
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is not available",
        },
        { status: 401 }
      )
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 201 }
    )
  } catch (error) {
    console.log("Error checking username", error)
    return Response.json(
      {
        success: false,
        message: "Username validation failed",
      },
      { status: 500 }
    )
  }
}

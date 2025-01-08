import { User, getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import connectDb from "@/lib/connectDb"
import { UserModel } from "@/models/models"

export async function POST(req: Request) {
  await connectDb()
  const session = await getServerSession(authOptions)
  const user = session?.user as User
  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "User is not auhtenticated",
      },
      { status: 403 }
    )
  }
  const userId = user?._id
  const { acceptingMessages } = await req.json()
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptingMessages },
      { new: true }
    )
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 401 }
      )
    }
    updatedUser?.save()
    return Response.json(
      {
        success: true,
        message: "Accept messages status changed",
      },
      { status: 200 }
    )
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error while changing accept-messages status!",
      },
      { status: 500 }
    )
  }
}
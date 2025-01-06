import { resend } from "@/lib/resend"
import { ApiResponse } from "@/types/ApiResponse"
import VerificationEmailTemplate from "../../emailTemplates/verificationEmailTemplate"

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log("sending verification email")
    console.log({ email, username, verifyCode })
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification Email",
      react: VerificationEmailTemplate({ username, otp: verifyCode }),
    })

    return { success: true, message: "Verification code/otp sent successfully" }
  } catch (error) {
    console.log("Error while sending verification email", error)
    return { success: false, message: "Failed to send verifiaction email" }
  }
}

import { z } from "zod"

export const loginSchema = z.discriminatedUnion("type", [
    z.object({
      type: z.literal("request-otp"),
      email: z.email().min(1, 'email is required'),
    }).strict(),
    z.object({
      type: z.literal("verify-otp"),
      email: z.email(),
      otp: z.string().min(6).max(6, "OTP must be 6 digits"), // adjust as needed
    }).strict(),
  ])

export type TLoginSchema = z.infer<typeof loginSchema>
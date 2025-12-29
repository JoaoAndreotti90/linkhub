"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function loginWithCreds(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  let redirectTo = formData.get("redirectTo") as string

  if (!redirectTo || redirectTo === "null" || redirectTo === "undefined") {
    redirectTo = "/dashboard"
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, 
    })
    
    return { success: true, url: redirectTo }

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou senha incorretos." }
        default:
          return { error: "Algo deu errado." }
      }
    }
    return { error: "Erro no servidor." }
  }
}
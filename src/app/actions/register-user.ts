"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "Preencha todos os campos." }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "Este email já está cadastrado." }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        slug: name.toLowerCase().replace(/\s+/g, '-') + "-" + Math.floor(Math.random() * 1000)
      }
    })

    return { success: true }
  } catch {
    return { error: "Erro ao criar conta. Tente novamente." }
  }
}
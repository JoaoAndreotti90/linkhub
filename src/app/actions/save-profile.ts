"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function saveProfile(slug: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  const regex = /^[a-z0-9-]+$/
  if (!regex.test(slug)) {
    return { error: "O link só pode conter letras minúsculas, números e traços." }
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { slug }
    })

    if (existing && existing.id !== session.user.id) {
      return { error: "Este link já está em uso por outra pessoa." }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { slug }
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { error: "Erro ao salvar perfil." }
  }
}
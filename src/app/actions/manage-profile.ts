"use server"

import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const profileSchema = z.object({
  slug: z.string()
    .min(3, "O link deve ter pelo menos 3 letras")
    .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e traços")
})

export async function saveProfile(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  const slug = formData.get("slug") as string

  const validation = profileSchema.safeParse({ slug })

  if (!validation.success) {
    return { error: validation.error.errors[0].message }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { slug }
    })

    if (existingUser && existingUser.id !== session.user.id) {
      return { error: "Este link já está em uso." }
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
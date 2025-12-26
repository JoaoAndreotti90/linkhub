"use server"

import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const createLinkSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  url: z.string().url("URL inválida (comece com http:// ou https://)")
})

export async function createLink(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado" }
  }

  const title = formData.get("title") as string
  const url = formData.get("url") as string

  const validation = createLinkSchema.safeParse({ title, url })

  if (!validation.success) {
    return { error: validation.error.errors[0].message }
  }

  try {
    await prisma.link.create({
      data: {
        title,
        url,
        userId: session.user.id
      }
    })

    revalidatePath("/dashboard")
    return { success: true }
    
  } catch (error) {
    return { error: "Erro ao criar link no banco de dados" }
  }
}
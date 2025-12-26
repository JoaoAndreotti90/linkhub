"use server"

import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const updateLinkSchema = z.object({
  linkId: z.string(),
  title: z.string().min(1, "O título é obrigatório"),
  url: z.string().url("URL inválida")
})

export async function updateLink(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  const linkId = formData.get("linkId") as string
  const title = formData.get("title") as string
  const url = formData.get("url") as string

  const validation = updateLinkSchema.safeParse({ linkId, title, url })

  if (!validation.success) {
    return { error: validation.error.errors[0].message }
  }

  try {
    await prisma.link.update({
      where: {
        id: linkId,
        userId: session.user.id
      },
      data: { title, url }
    })

    revalidatePath("/dashboard")
    return { success: true }
    
  } catch (error) {
    return { error: "Erro ao atualizar link" }
  }
}
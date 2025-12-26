"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface Update {
  id: string
  order: number
}

export async function reorderLinks(updates: Update[]) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  try {
    const transaction = updates.map((update) => 
      prisma.link.update({
        where: { 
          id: update.id,
          userId: session.user.id
        },
        data: { order: update.order }
      })
    )

    await prisma.$transaction(transaction)

    revalidatePath("/dashboard")
    revalidatePath(`/${session.user.slug}`)
    
    return { success: true }
  } catch (error) {
    return { error: "Erro ao reordenar" }
  }
}
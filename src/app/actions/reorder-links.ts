"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

type LinkItem = {
  id: string
  order: number
}

export async function reorderLinks(items: LinkItem[]) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  const userId = session.user.id

  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.link.update({
          where: {
            id: item.id,
            userId: userId, 
          },
          data: {
            order: item.order,
          },
        })
      )
    )

    return { success: true }
  } catch {
    return { error: "Erro ao reordenar links" }
  }
}
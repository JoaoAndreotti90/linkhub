"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// Definindo o tipo do item que vamos receber
type LinkItem = {
  id: string
  order: number
}

export async function reorderLinks(items: LinkItem[]) {
  const session = await auth()

  // 1. Verificação de segurança: Se não tiver usuário, para tudo.
  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  // 2. Guardamos o ID numa variável constante (isso acalma o TypeScript)
  const userId = session.user.id

  try {
    // Usamos transaction para garantir que todos atualizem ou nenhum atualize
    await prisma.$transaction(
      items.map((item) =>
        prisma.link.update({
          where: {
            id: item.id,
            userId: userId, // Agora usamos a variável garantida
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
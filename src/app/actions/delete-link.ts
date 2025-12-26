"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteLink(linkId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  try {
    await prisma.link.delete({
      where: {
        id: linkId,
        userId: session.user.id
      }
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { error: "Erro ao deletar link" }
  }
}
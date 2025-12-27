"use server"

import { auth, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function removeProfileImage() {
  const session = await auth()
  if (!session?.user?.id) return { error: "Não autorizado" }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: null } // Remove a foto
  })

  revalidatePath("/dashboard")
  return { success: true }
}

export async function deleteAccount() {
  const session = await auth()
  if (!session?.user?.id) return { error: "Não autorizado" }

  // Deleta o usuário (os links somem junto se configurado em cascata, senão deletamos links antes)
  await prisma.link.deleteMany({ where: { userId: session.user.id } })
  await prisma.user.delete({ where: { id: session.user.id } })

  await signOut({ redirectTo: "/" })
  return { success: true }
}
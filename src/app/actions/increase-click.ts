"use server"

import { prisma } from "@/lib/prisma"

export async function increaseClick(linkId: string) {
  try {
    await prisma.link.update({
      where: { id: linkId },
      data: {
        clicks: {
          increment: 1
        }
      }
    })
  } catch (error) {
    console.error("Erro ao computar clique", error)
  }
}
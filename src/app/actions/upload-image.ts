"use server"

import { put } from "@vercel/blob"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function uploadProfileImage(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  const imageFile = formData.get('image') as File
  
  if (!imageFile || imageFile.size === 0) {
    return { error: "Nenhuma imagem selecionada" }
  }

  try {
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true // <--- A MÁGICA ESTÁ AQUI (Cria nomes únicos)
    })

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: blob.url }
    })

    revalidatePath("/dashboard")
    return { success: true, url: blob.url }

  } catch (error) {
    return { error: "Erro ao fazer upload da imagem" }
  }
}
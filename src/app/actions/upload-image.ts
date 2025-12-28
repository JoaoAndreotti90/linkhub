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

  // TESTE 1: Verificar se o token existe
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("ERRO CRÍTICO: Token do Vercel Blob não encontrado no .env")
    return { error: "Erro de configuração: Token ausente" }
  }

  const imageFile = formData.get('image') as File
  
  if (!imageFile || imageFile.size === 0) {
    return { error: "Nenhuma imagem selecionada" }
  }

  try {
    // Tenta enviar para a nuvem
    console.log("Iniciando upload para Vercel Blob...")
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    })
    console.log("Upload concluído! URL:", blob.url)

    // Tenta salvar no banco
    console.log("Salvando no banco de dados...")
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: blob.url }
    })
    console.log("Salvo no banco com sucesso!")

    revalidatePath("/dashboard")
    return { success: true, url: blob.url }

  } catch (error) {
    // AQUI ESTÁ O SEGREDO: Vamos ver o erro real no terminal
    console.error("DETALHES DO ERRO DE UPLOAD:", error)
    return { error: "Falha técnica. Olhe o terminal do VS Code." }
  }
}
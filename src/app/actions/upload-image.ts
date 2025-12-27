"use server"

import { put } from "@vercel/blob"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function uploadProfileImage(formData: FormData) {
  console.log("1. Iniciando Server Action de Upload...")

  const session = await auth()
  
  if (!session?.user?.id) {
    console.log("ERRO: Usuário não logado")
    return { error: "Não autorizado" }
  }

  // Verificando se a chave existe
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log("ERRO CRÍTICO: Chave BLOB_READ_WRITE_TOKEN não encontrada no .env")
    return { error: "Erro de configuração: Chave ausente" }
  }

  const imageFile = formData.get('image') as File
  
  if (!imageFile || imageFile.size === 0) {
    console.log("ERRO: Nenhuma imagem recebida")
    return { error: "Nenhuma imagem selecionada" }
  }

  console.log(`2. Tentando fazer upload de: ${imageFile.name}`)

  try {
    // 1. Faz o upload para o Vercel Blob
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN // Forçando o uso do token
    })

    console.log("3. Upload concluído! URL gerada:", blob.url)

    // 2. Salva o link da imagem no banco de dados do usuário
    console.log("4. Salvando no banco de dados para o ID:", session.user.id)
    
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: blob.url }
    })

    console.log("5. Salvo no banco com sucesso!")

    revalidatePath("/dashboard")
    return { success: true, url: blob.url }

  } catch (error) {
    console.error("ERRO FATAL:", error)
    return { error: "Erro ao fazer upload (Verifique o terminal)" }
  }
}
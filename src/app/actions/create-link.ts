"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const linkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  type: z.string() 
})

// Ícones prontos (URLs públicas)
const ICONS = {
    instagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png",
    github: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
    linkedin: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    youtube: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    whatsapp: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    default: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
}

export async function createLink(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Não autorizado" }

  const title = formData.get("title") as string
  const url = formData.get("url") as string
  const type = formData.get("type") as string
  const imageFile = formData.get("image") as File

  // Validação
  const validation = linkSchema.safeParse({ title, url, type })
  if (!validation.success) return { error: "Preencha título e URL corretamente" }

  let imageUrl = ICONS.default

  // Lógica da Imagem/Ícone
  if (type === "custom" && imageFile && imageFile.size > 0) {
      try {
        const blob = await put(imageFile.name, imageFile, { 
            access: 'public', 
            token: process.env.BLOB_READ_WRITE_TOKEN 
        })
        imageUrl = blob.url
      } catch {
        return { error: "Erro ao enviar imagem" }
      }
  } else if (type in ICONS) {
      // @ts-ignore
      imageUrl = ICONS[type]
  }

  // Pegar ordem
  const lastLink = await prisma.link.findFirst({
    where: { userId: session.user.id },
    orderBy: { order: 'desc' }
  })
  const newOrder = lastLink ? lastLink.order + 1 : 0

  await prisma.link.create({
    data: {
      userId: session.user.id,
      title,
      url,
      icon: imageUrl, // <--- CORRIGIDO AQUI (Era "image", agora é "icon")
      order: newOrder
    }
  })

  revalidatePath("/dashboard")
  return { success: true }
}
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { LinkCard } from "@/components/link-card"

export default async function PublicProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const user = await prisma.user.findUnique({
    where: { slug },
    include: { 
      links: {
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 py-10">
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          {user.image && (
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={user.image} 
              alt={user.name || "User"} 
              className="h-24 w-24 rounded-full border-4 border-gray-800 shadow-xl"
            />
          )}
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-gray-400">@{user.slug}</p>
        </div>

        <div className="flex w-full flex-col gap-4">
          {user.links.map((link) => (
            <LinkCard 
              key={link.id}
              id={link.id}
              url={link.url}
              title={link.title}
            />
          ))}
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          Feito com <span className="font-bold text-white">LinkHub</span>
        </div>
      </div>
    </div>
  )
}
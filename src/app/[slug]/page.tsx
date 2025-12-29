import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { LinkCard } from "@/components/link-card"

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const user = await prisma.user.findUnique({
    where: { slug },
    include: {
      links: {
        orderBy: { order: "asc" }
      }
    }
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-white p-1">
             {user.image ? (
               <img
                 src={user.image}
                 alt={user.name || "User"}
                 className="h-full w-full rounded-full object-cover"
               />
             ) : (
               <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                 {user.name?.[0]?.toUpperCase() || "U"}
               </div>
             )}
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-gray-400">@{user.slug}</p>
        </div>

        <div className="w-full flex flex-col gap-4">
          {user.links.map((link) => (
            <LinkCard 
                key={link.id}
                id={link.id}
                title={link.title}
                url={link.url}
                icon={link.icon}
            />
          ))}

          {user.links.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              Este usuário ainda não adicionou links.
            </div>
          )}
        </div>

        {user.plan === 'FREE' && (
            <div className="mt-8 text-gray-500 text-xs flex flex-col items-center gap-1">
                <span>Feito com <span className="font-bold text-white">LinkHub</span></span>
                <Link href="/" className="hover:underline opacity-50 hover:opacity-100">Crie o seu grátis</Link>
            </div>
        )}

      </div>
    </div>
  )
}
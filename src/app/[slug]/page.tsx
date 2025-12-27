import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

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
        
        {/* FOTO DO USUÁRIO */}
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-white p-1">
             {user.image ? (
               /* eslint-disable-next-line @next/next/no-img-element */
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

        {/* NOME E SLUG */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-gray-400">@{user.slug}</p>
        </div>

        {/* LISTA DE LINKS */}
        <div className="w-full flex flex-col gap-4">
          {user.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              // Adicionei "relative flex items-center justify-center" para posicionar o ícone
              className="relative flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 transition-all text-white font-medium py-4 px-6 rounded-xl border border-gray-700 hover:scale-[1.02]"
            >
              {/* ÍCONE DO LINK (Se existir) */}
              {link.icon && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={link.icon} 
                  alt="" 
                  className="absolute left-4 h-6 w-6 object-contain" // Fica fixo na esquerda
                />
              )}
              
              {/* TÍTULO DO LINK */}
              <span>{link.title}</span>
            </a>
          ))}

          {user.links.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              Este usuário ainda não adicionou links.
            </div>
          )}
        </div>

        <div className="mt-8 text-gray-500 text-xs">
           Feito com <span className="font-bold text-white">LinkHub</span>
        </div>

      </div>
    </div>
  )
}
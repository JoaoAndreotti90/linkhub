import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { CreateLinkForm } from "@/components/create-link-form"
import { ProfileForm } from "@/components/profile-form"
import { LinkList } from "@/components/link-list"
import { UpgradeButton } from "@/components/upgrade-button"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { order: 'asc' } 
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">LinkHub</h1>
          
          <div className="flex items-center gap-4">
            {/* Botão de Pagamento aqui */}
            <UpgradeButton />

            <span className="text-sm font-medium text-gray-900">Olá, {session.user.name}</span>
            
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <button type="submit" className="text-sm font-medium text-red-600 hover:underline">
                Sair
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="mx-auto mt-10 max-w-xl px-4 pb-10">
        <ProfileForm initialSlug={user?.slug} />
        
        <CreateLinkForm />

        <div className="mt-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">Seus Links</h2>
          
          {links.length === 0 ? (
            <p className="text-center text-gray-500">Você ainda não criou nenhum link.</p>
          ) : (
             <LinkList initialLinks={links} />
          )}
        </div>
      </main>
    </div>
  )
}
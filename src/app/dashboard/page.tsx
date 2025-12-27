import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { CreateLinkForm } from "@/components/create-link-form"
import { ProfileForm } from "@/components/profile-form"
import { LinkList } from "@/components/link-list"
import { UpgradeButton } from "@/components/upgrade-button"
import { SignOutButton } from "@/components/sign-out-button"

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
            <UpgradeButton plan={user?.plan} />

            <span className="text-sm font-medium text-gray-900">Olá, {user?.name || session.user.name}</span>
            
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="mx-auto mt-10 max-w-xl px-4 pb-10">
        <ProfileForm user={user} />
        
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
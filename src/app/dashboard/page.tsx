import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { CreateLinkForm } from "@/components/create-link-form"
import { ProfileForm } from "@/components/profile-form"
import { LinkList } from "@/components/link-list"
import { Header } from "@/components/header"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  const userData = {
    ...user,
    name: user?.name || session.user.name
  }

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { order: 'asc' } 
  })

  return (
    <div className="min-h-screen bg-gray-50">
      
      <Header user={userData} />

      <main className="mx-auto mt-10 max-w-xl px-4 pb-10">
        <ProfileForm user={userData} />
        
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
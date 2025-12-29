import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createCheckout } from "@/app/actions/create-checkout"

export default async function UpgradePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login?callbackUrl=/upgrade")
  }

  const result = await createCheckout()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((result as any)?.url) {
    redirect((result as any).url)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="rounded-lg bg-red-50 p-6 text-red-800 border border-red-200 max-w-md text-center">
        <h1 className="text-xl font-bold mb-2">Ops! Ocorreu um erro.</h1>
        <p className="font-mono text-sm bg-white p-2 rounded border border-red-100">
            {(result as any)?.error || "Erro desconhecido"}
        </p>
        <a href="/dashboard" className="mt-4 inline-block text-sm underline hover:text-red-900">
            Voltar para Dashboard
        </a>
      </div>
    </div>
  )
}
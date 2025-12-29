"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, Suspense } from "react"
import { loginWithCreds } from "@/app/actions/email-login"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

function EmailLoginFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    
    formData.set("redirectTo", callbackUrl)

    try {
      const result = await loginWithCreds(formData)
      
      if (result?.error) {
        toast.error(result.error)
        setIsLoading(false)
      } else if (result?.success && result?.url) {
        toast.success("Entrando...")
        window.location.href = result.url
      }
    } catch {
      toast.error("Erro de conexão. Tente novamente.")
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="seu@email.com"
          className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 outline-none"
        />
      </div>

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-gray-900 px-5 py-3 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 flex justify-center"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Entrar com Email"}
      </button>
    </form>
  )
}

export function EmailLoginForm() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EmailLoginFormContent />
    </Suspense>
  )
}
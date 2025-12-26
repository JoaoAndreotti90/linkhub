"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { registerUser } from "@/app/actions/register-user"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    
    const result = await registerUser(formData)

    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
      return
    }

    toast.success("Conta criada! Faça login para continuar.")
    router.push("/login")
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Nome</label>
        <input 
          name="name"
          type="text" 
          required
          placeholder="Seu nome"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input 
          name="email"
          type="email" 
          required
          placeholder="seu@email.com"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Senha</label>
        <input 
          name="password"
          type="password" 
          required
          placeholder="********"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Criando conta..." : "Criar Conta Grátis"}
      </button>
    </form>
  )
}
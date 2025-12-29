"use client"

import { createCheckout } from "@/app/actions/create-checkout"
import { Crown, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function UpgradeButton({ plan }: { plan?: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  if (plan === "PRO") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700 border border-yellow-200">
        <Crown className="h-3 w-3" />
        MEMBRO PRO
      </div>
    )
  }

  async function handleUpgrade() {
    setIsLoading(true)
    
    try {
        const result = await createCheckout()
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const url = (result as any)?.url

        if (url) {
            router.push(url)
        } else {
            toast.error("Erro ao iniciar pagamento")
        }
    } catch (error) {
        toast.error("Erro inesperado")
    } finally {
        // loading persiste até o redirecionamento
    }
  }

  return (
    <button 
        onClick={handleUpgrade}
        disabled={isLoading}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Crown className="h-3 w-3" />}
      VIRAR PRO
    </button>
  )
}
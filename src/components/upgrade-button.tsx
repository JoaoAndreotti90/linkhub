"use client"

import { createCheckout } from "@/app/actions/create-checkout" // <--- Importando SUA função
import { Crown, Loader2 } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"

interface UpgradeButtonProps {
  plan?: "FREE" | "PRO"
}

export function UpgradeButton({ plan = "FREE" }: UpgradeButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleUpgrade = () => {
    startTransition(async () => {
      try {
        const result = await createCheckout()
        // Se a função retornar erro (ex: não configurado), mostramos o toast
        if (result && typeof result === 'object' && 'error' in result) {
             toast.error(result.error)
        }
      } catch (error) {
        toast.error("Erro ao iniciar pagamento.")
      }
    })
  }
  
  if (plan === "PRO") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm ring-1 ring-orange-200">
        <Crown className="h-3 w-3 fill-white" />
        MEMBRO PRO
      </div>
    )
  }

  return (
    <button 
      onClick={handleUpgrade}
      disabled={isPending}
      className="flex items-center gap-2 rounded-md bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-md disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Crown className="h-4 w-4" />
      )}
      {isPending ? "Carregando..." : "Seja PRO"}
    </button>
  )
}
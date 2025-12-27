"use client"

import Link from "next/link"
import { Crown } from "lucide-react"

interface UpgradeButtonProps {
  plan?: "FREE" | "PRO"
}

export function UpgradeButton({ plan = "FREE" }: UpgradeButtonProps) {
  
  if (plan === "PRO") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm ring-1 ring-orange-200">
        <Crown className="h-3 w-3 fill-white" />
        MEMBRO PRO
      </div>
    )
  }

  return (
    <Link 
      href="/#precos" 
      className="flex items-center gap-2 rounded-md bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-md"
    >
      <Crown className="h-4 w-4" />
      Seja PRO
    </Link>
  )
}
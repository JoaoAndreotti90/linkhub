"use client"

import { createCheckout } from "@/app/actions/create-checkout"
import { Zap } from "lucide-react"

export function UpgradeButton() {
  return (
    <button
      onClick={() => createCheckout()}
      className="flex items-center gap-2 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
    >
      <Zap className="h-4 w-4 fill-white" />
      Seja PRO
    </button>
  )
}
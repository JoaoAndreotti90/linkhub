"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
      >
        <LogOut className="h-4 w-4" />
        Sair
      </button>

      {/* Modal de Confirmação de Saída */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sair da conta?</h3>
                <p className="text-gray-600 mb-6">Você precisará fazer login novamente para acessar seus links.</p>
                
                <div className="flex gap-3 justify-end">
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={() => signOut({ callbackUrl: "/" })} 
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                        Sim, sair
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  )
}
"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { UpgradeButton } from "./upgrade-button"
import { SignOutButton } from "./sign-out-button"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Header({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b bg-white px-4 py-4 shadow-sm relative z-40">
       <div className="mx-auto flex max-w-4xl items-center justify-between">
         <h1 className="text-xl font-bold text-gray-900">LinkHub</h1>

         <div className="hidden md:flex items-center gap-4">
             <UpgradeButton plan={user?.plan} />
             <span className="text-sm font-medium text-gray-900">Olá, {user?.name}</span>
             <SignOutButton />
         </div>

         <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-700 p-1 hover:bg-gray-100 rounded-md transition-colors"
         >
             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
         </button>
       </div>

       {isOpen && (
         <div className="absolute top-full left-0 w-full bg-white border-b shadow-lg p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2">
            
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                 <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Logado como</span>
                    <span className="text-sm font-bold text-gray-900">{user?.name}</span>
                 </div>
                 <UpgradeButton plan={user?.plan} />
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
                <SignOutButton />
            </div>
         </div>
       )}
    </nav>
  )
}
"use client"

import { increaseClick } from "@/app/actions/increase-click"
import Image from "next/image"

interface LinkCardProps {
  id: string
  title: string
  url: string
  icon?: string | null
}

export function LinkCard({ id, title, url, icon }: LinkCardProps) {
  
  function handleClick() {
    increaseClick(id)
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="relative flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 transition-all text-white font-medium py-4 px-6 rounded-xl border border-gray-700 hover:scale-[1.02]"
    >
      {icon && (
        <div className="absolute left-4 h-8 w-8">
            <img 
                src={icon} 
                alt="" 
                className="h-full w-full object-contain"
            />
        </div>
      )}
      
      <span className="text-center w-full">{title}</span>
    </a>
  )
}
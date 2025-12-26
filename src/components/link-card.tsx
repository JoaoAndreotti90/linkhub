"use client"

import { increaseClick } from "@/app/actions/increase-click"

interface LinkCardProps {
  id: string
  title: string
  url: string
}

export function LinkCard({ id, title, url }: LinkCardProps) {
  
  function handleClick() {
    increaseClick(id)
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group flex w-full items-center justify-center rounded-xl bg-gray-800 p-4 font-semibold text-white transition-all hover:scale-105 hover:bg-gray-700"
    >
      {title}
    </a>
  )
}
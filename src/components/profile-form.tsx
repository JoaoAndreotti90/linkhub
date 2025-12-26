"use client"

import { useState } from "react"
import { saveProfile } from "@/app/actions/save-profile"
import { toast } from "sonner"
import { ExternalLink, Copy, Check, Save } from "lucide-react"

export function ProfileForm({ initialSlug }: { initialSlug?: string | null }) {
  const [slug, setSlug] = useState(initialSlug || "")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave() {
    if (!slug) return
    
    setIsSaving(true)
    const result = await saveProfile(slug)
    setIsSaving(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success("Link personalizado salvo!")
  }

  function handleCopy() {
    const url = `${window.location.origin}/${slug}`
    navigator.clipboard.writeText(url)
    toast.success("Link copiado para a área de transferência!")
  }

  function handleOpen() {
    const url = `${window.location.origin}/${slug}`
    window.open(url, "_blank")
  }

  return (
    <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Seu Link Personalizado</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
            <span className="text-gray-500 select-none">linkhub.com/</span>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="seu-nome"
              className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none"
            />
          </div>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? "Salvando..." : (
              <>
                <Save className="h-4 w-4" />
                Salvar
              </>
            )}
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleOpen}
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Visitar meu Link
          </button>

          <button
            onClick={handleCopy}
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
          >
            <Copy className="h-4 w-4" />
            Copiar Link
          </button>
        </div>
      </div>
    </div>
  )
}
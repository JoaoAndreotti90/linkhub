"use client"

import { useState } from "react"
import { createLink } from "@/app/actions/create-link"
import { toast } from "sonner"
import { Plus, Link as LinkIcon, Image as ImageIcon } from "lucide-react"

export function CreateLinkForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("instagram") // Padrão

  async function handleSubmit(formData: FormData) {
    const result = await createLink(formData)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Link adicionado!")
      setIsOpen(false)
      setSelectedType("instagram")
    }
  }

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-8 text-center font-medium text-gray-500 hover:border-gray-400 hover:bg-gray-100 transition-all">
        <div className="flex flex-col items-center gap-2">
            <Plus className="h-8 w-8 text-gray-400" />
            Adicionar Novo Link
        </div>
      </button>
    )
  }

  return (
    <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h3 className="mb-4 font-semibold text-gray-900">Novo Link</h3>
      
      <form action={handleSubmit} className="flex flex-col gap-4">
        
        {/* SELETOR DE TIPO */}
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de Link</label>
            <select 
                name="type" 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                // ADICIONEI "text-gray-900" AQUI EMBAIXO PARA O TEXTO FICAR PRETO
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 text-gray-900"
            >
                <option value="instagram" className="text-gray-900">Instagram (Ícone Automático)</option>
                <option value="github" className="text-gray-900">GitHub (Ícone Automático)</option>
                <option value="linkedin" className="text-gray-900">LinkedIn (Ícone Automático)</option>
                <option value="youtube" className="text-gray-900">YouTube (Ícone Automático)</option>
                <option value="whatsapp" className="text-gray-900">WhatsApp (Ícone Automático)</option>
                <option value="custom" className="text-gray-900">Outros (Enviar Foto...)</option>
            </select>
        </div>

        {/* UPLOAD DE IMAGEM (Só aparece se for "Outros") */}
        {selectedType === "custom" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="mb-1 block text-sm font-medium text-gray-700">Ícone Personalizado</label>
                <div className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                    <input type="file" name="image" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
            </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Título</label>
          <input name="title" required placeholder="Ex: Meu Instagram" className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 text-gray-900" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">URL de Destino</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input name="url" required type="url" placeholder="https://..." className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 outline-none focus:border-blue-500 text-gray-900" />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button type="button" onClick={() => setIsOpen(false)} className="flex-1 rounded-md border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button type="submit" className="flex-1 rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Criar Link
          </button>
        </div>
      </form>
    </div>
  )
}
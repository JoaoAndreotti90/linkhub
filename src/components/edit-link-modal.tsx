"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Pencil, X } from "lucide-react"
import { updateLink } from "@/app/actions/update-link"

interface LinkData {
  id: string
  title: string
  url: string
}

export function EditLinkModal({ link }: { link: LinkData }) {
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      title: link.title,
      url: link.url
    }
  })

  async function onSubmit(data: { title: string, url: string }) {
    const formData = new FormData()
    formData.append("linkId", link.id)
    formData.append("title", data.title)
    formData.append("url", data.url)

    const result = await updateLink(formData)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success("Link atualizado!")
    setIsOpen(false)
    window.location.reload() 
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="rounded-md p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <Pencil className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Editar Link</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Título</label>
                <input
                  {...register("title", { required: true })}
                  className="rounded-md border border-gray-300 p-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">URL</label>
                <input
                  {...register("url", { required: true })}
                  className="rounded-md border border-gray-300 p-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
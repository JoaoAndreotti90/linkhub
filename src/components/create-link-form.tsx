"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import { createLink } from "@/app/actions/create-link"

type FormValues = {
  title: string
  url: string
}

export function CreateLinkForm() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>()

  async function onSubmit(data: FormValues) {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("url", data.url)

    const result = await createLink(formData)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success("Link criado com sucesso!")
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-semibold text-gray-900">Título do Link</label>
        <input
          id="title"
          placeholder="Ex: Meu Instagram"
          {...register("title", { required: true })}
          className="rounded-md border border-gray-300 p-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="url" className="text-sm font-semibold text-gray-900">URL de Destino</label>
        <input
          id="url"
          placeholder="https://instagram.com/..."
          {...register("url", { required: true })}
          className="rounded-md border border-gray-300 p-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        <Plus className="h-4 w-4" />
        {isSubmitting ? "Criando..." : "Adicionar Link"}
      </button>
    </form>
  )
}
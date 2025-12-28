"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { saveProfile } from "@/app/actions/save-profile"
import { uploadProfileImage } from "@/app/actions/upload-image"
import { removeProfileImage, deleteAccount } from "@/app/actions/manage-profile"
import { toast } from "sonner"
import { ExternalLink, Copy, Save, Camera, Trash2, AlertTriangle, X, Loader2 } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProfileForm({ user }: { user: any }) {
  const [slug, setSlug] = useState(user?.slug || "")
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isRemovePhotoModalOpen, setIsRemovePhotoModalOpen] = useState(false)
  
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const router = useRouter()

  async function handleSave() {
    if (!slug) return
    setIsSaving(true)

    try {
        const formData = new FormData()
        formData.append("slug", slug)

        const result = await saveProfile(formData)
        
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Link salvo!")
            router.refresh()
        }
    } catch {
        toast.error("Erro ao salvar")
    } finally {
        setIsSaving(false)
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    // Limite de 4.5MB (Limite técnico da Vercel Server Actions)
    if (file.size > 4.5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 4.5MB")
        return
    }

    setIsUploading(true)

    try {
        const formData = new FormData()
        formData.append("image", file)
        
        const result = await uploadProfileImage(formData)
        
        if (result.error) {
            // AQUI O CONSOLE LOG QUE VOCÊ PEDIU
            console.error("❌ ERRO NO UPLOAD:", result.error)
            toast.error(result.error)
        } else {
            toast.success("Foto atualizada!")
            router.refresh()
        }
    } catch (error) {
        console.error("❌ ERRO INESPERADO:", error)
        toast.error("Erro ao fazer upload")
    } finally {
        setIsUploading(false)
        event.target.value = ""
    }
  }

  async function confirmRemoveImage() {
    await removeProfileImage()
    toast.success("Foto removida")
    setIsRemovePhotoModalOpen(false) 
    router.refresh()
  }

  async function confirmDeleteAccount() {
    if (deleteConfirmation !== "DELETAR") return
    setIsDeleting(true)
    const result = await deleteAccount()
    if (result?.error) {
        toast.error("Erro ao excluir conta")
        setIsDeleting(false)
    } else {
        toast.success("Conta excluída.")
    }
  }

  function handleCopy() {
    const url = `${window.location.origin}/${slug}`
    navigator.clipboard.writeText(url)
    toast.success("Copiado!")
  }

  function handleOpen() {
    window.open(`${window.location.origin}/${slug}`, "_blank")
  }

  return (
    <>
        <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm space-y-8 w-full max-w-full overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-100">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gray-100 border border-gray-200 group">
            {user?.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={user.image} alt="Perfil" className="h-full w-full object-cover" />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400">
                {user?.name?.[0]?.toUpperCase()}
                </div>
            )}
            
            {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
            )}
            </div>
            
            <div className="flex flex-col items-center sm:items-start gap-2">
            <h2 className="font-semibold text-gray-900">Foto de Perfil</h2>
            <div className="flex gap-2">
                <label className={`cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isUploading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                            <span>Enviando...</span>
                        </>
                    ) : (
                        <>
                            <Camera className="h-4 w-4" />
                            <span>Trocar</span>
                        </>
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload} 
                        disabled={isUploading}
                    />
                </label>
                
                {user?.image && !isUploading && (
                    <button 
                        onClick={() => setIsRemovePhotoModalOpen(true)}
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 flex items-center gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                )}
            </div>
            </div>
        </div>

        <div>
            <h2 className="mb-4 text-base font-semibold text-gray-900">Seu Link</h2>
            <div className="flex flex-col gap-4">
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="flex flex-1 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 overflow-hidden">
                        <span className="text-gray-500 select-none whitespace-nowrap">linkhub.com/</span>
                        <input 
                            value={slug} 
                            onChange={(e) => setSlug(e.target.value)} 
                            placeholder="seu-nome" 
                            className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none min-w-0" 
                        />
                    </div>
                    <button onClick={handleSave} disabled={isSaving} className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 shrink-0 disabled:opacity-70">
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isSaving ? "Salvando..." : "Salvar"}
                    </button>
                </div>

                <div className="flex gap-3">
                    <button onClick={handleOpen} className="flex-1 flex justify-center items-center gap-2 rounded-md border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><ExternalLink className="h-4 w-4"/> Visitar</button>
                    <button onClick={handleCopy} className="flex-1 flex justify-center items-center gap-2 rounded-md border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Copy className="h-4 w-4"/> Copiar</button>
                </div>
            </div>
        </div>

        <div className="pt-6 border-t border-red-100">
            <h3 className="text-red-600 font-semibold flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4"/> Zona de Perigo
            </h3>
            <p className="text-sm text-gray-500 mb-4">Ao excluir sua conta, todos os seus links e dados serão perdidos permanentemente.</p>
            <button 
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-red-600 text-sm font-medium hover:underline"
            >
                Quero excluir minha conta
            </button>
        </div>
        </div>

        {isRemovePhotoModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Remover foto?</h3>
                    <p className="text-gray-600 mb-6">Sua foto de perfil será apagada e voltará a mostrar a inicial do seu nome.</p>
                    <div className="flex gap-3 justify-end">
                        <button onClick={() => setIsRemovePhotoModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">Cancelar</button>
                        <button onClick={confirmRemoveImage} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700">Sim, remover</button>
                    </div>
                </div>
            </div>
        )}

        {isDeleteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Excluir Conta</h3>
                        <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
                    </div>
                    <div className="mb-6 space-y-3">
                        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100">
                            <strong>Atenção:</strong> Essa ação não pode ser desfeita.
                        </div>
                        <p className="text-sm text-gray-600">Para confirmar, digite <strong>DELETAR</strong>:</p>
                        <input 
                            type="text" 
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            placeholder="Digite DELETAR"
                            className="w-full rounded-md border border-gray-300 p-2 text-gray-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        />
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">Cancelar</button>
                        <button 
                            onClick={confirmDeleteAccount}
                            disabled={deleteConfirmation !== "DELETAR" || isDeleting}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                        >
                            {isDeleting ? "Excluindo..." : "Excluir para sempre"}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}
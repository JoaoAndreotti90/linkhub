"use client"

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { GripVertical, Trash2 } from "lucide-react"
import { useState, useEffect } from "react" 
import { deleteLink } from "@/app/actions/delete-link"
import { reorderLinks } from "@/app/actions/reorder-links"
import { toast } from "sonner"
import { EditLinkModal } from "./edit-link-modal"

interface Link {
  id: string
  title: string
  url: string
  clicks: number
  order: number
}

export function LinkList({ initialLinks }: { initialLinks: Link[] }) {
  const [links, setLinks] = useState(initialLinks)
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setLinks(initialLinks)
  }, [initialLinks])

  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return

    const items = Array.from(links)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setLinks(items)

    const updates = items.map((link, index) => ({
      id: link.id,
      order: index
    }))

    await reorderLinks(updates)
  }

  async function confirmDelete() {
    if (!linkToDelete) return

    setIsDeleting(true)
    const result = await deleteLink(linkToDelete)
    
    if (result.success) {
      setLinks((prev) => prev.filter((link) => link.id !== linkToDelete))
      toast.success("Link removido")
    } else {
      toast.error("Erro ao remover link")
    }

    setIsDeleting(false)
    setLinkToDelete(null)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-4"
            >
              {links.map((link, index) => (
                <Draggable key={link.id} draggableId={link.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div {...provided.dragHandleProps} className="cursor-grab text-gray-400 hover:text-gray-700">
                          <GripVertical className="h-5 w-5" />
                        </div>
                        
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <p className="truncate font-bold text-gray-900">{link.title}</p>
                          <p className="truncate text-sm text-gray-600">{link.url}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="mr-2 text-sm font-medium text-gray-500 whitespace-nowrap">
                          {link.clicks} cliques
                        </div>

                        <EditLinkModal link={link} />

                        <button 
                          onClick={() => setLinkToDelete(link.id)}
                          className="rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {linkToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Excluir este link?</h3>
                <p className="text-gray-600 mb-6">Esta ação não pode ser desfeita e você perderá a contagem de cliques.</p>
                
                <div className="flex gap-3 justify-end">
                    <button 
                        onClick={() => setLinkToDelete(null)}
                        disabled={isDeleting}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={confirmDelete}
                        disabled={isDeleting}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                        {isDeleting ? "Excluindo..." : "Sim, excluir"}
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  )
}
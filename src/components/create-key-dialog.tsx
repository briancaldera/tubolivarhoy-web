'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CreateKeyForm } from '@/components/create-key-form'

export function CreateKeyDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (key: string) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear API key</DialogTitle>
          <DialogDescription>
            Crea un nueva API key para que puedas conectarte a la API de Tu
            Bolivar Hoy
          </DialogDescription>
        </DialogHeader>
        <div>
          <CreateKeyForm onSuccess={onSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group'
import { CopyIcon } from 'lucide-react'
import { toast } from 'sonner'

export function KeyCreatedDialog({
  apiKey,
  onClose,
}: {
  apiKey: string
  onClose: () => void
}) {
  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>API key creada</DialogTitle>
          <DialogDescription>
            Solo podras ver esta API key una vez. Guárdala en un lugar seguro.
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center'>
          <ButtonGroup>
            <ButtonGroupText className='max-w-[15ch] overflow-x-scroll'>
              {apiKey}
            </ButtonGroupText>
            <Button
              variant='outline'
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(apiKey)
                  toast.success('API key copiada al portapapeles! 🎉')
                } catch (e) {
                  toast.error('Error al intentar copiar la API key ❌')
                }
              }}
            >
              <CopyIcon />
              Copiar
            </Button>
          </ButtonGroup>
        </div>
        <DialogFooter>
          <Button className='bg-tbh-gradient' onClick={onClose}>
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

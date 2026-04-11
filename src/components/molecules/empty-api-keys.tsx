'use client'

import { KeyRoundIcon, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export function EmptyApiKeys({ onCreateKey }: { onCreateKey: () => void }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <KeyRoundIcon />
        </EmptyMedia>
        <EmptyTitle>Sin API keys</EmptyTitle>
        <EmptyDescription>
          Comienza por crear tu primera API key.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onCreateKey} className='bg-tbh-gradient'>
          <Plus />
          Crear API key
        </Button>
      </EmptyContent>
    </Empty>
  )
}

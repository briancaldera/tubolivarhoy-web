'use client'

import { H1 } from '@/components/typography/h1'
import { P } from '@/components/typography/p'
import { useApiKeys } from '@/hooks/useApiKeys'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EmptyApiKeys } from '@/components/molecules/empty-api-keys'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useState } from 'react'
import { CreateKeyDialog } from '@/components/create-key-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { EllipsisVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { KeyCreatedDialog } from '@/components/key-created-dialog'

export function ApiKeysSection() {
  const { isPending, error, apiKeys } = useApiKeys()
  const [showCreateKeyForm, setShowCreateKeyForm] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)

  return (
    <section className='@container mx-auto max-w-[1200px]'>
      <Card>
        <CardHeader className='flex flex-row justify-between'>
          <div>
            <H1>API keys</H1>
            <P>Crea nuevas API keys para poder conectarte a la API</P>
          </div>
          <div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setShowCreateKeyForm(true)}
            >
              <PlusIcon />
              Nueva key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            {apiKeys && apiKeys.length !== 0 ? (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='font-light'>NOMBRE</TableHead>
                      <TableHead className='font-light'>API KEY</TableHead>
                      <TableHead className='font-light'>Creado</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys &&
                      apiKeys.map((apiKey) => (
                        <TableRow key={apiKey.id}>
                          <TableCell>{apiKey.name}</TableCell>
                          <TableCell>{apiKey.prefix}...</TableCell>
                          <TableCell>
                            {new Date(apiKey.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell align='right'>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild={true}>
                                <Button size='icon-xs' variant='ghost'>
                                  <EllipsisVerticalIcon />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuItem>
                                  <Trash2Icon />
                                  Eliminar API key
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyApiKeys onCreateKey={() => setShowCreateKeyForm(true)} />
            )}
          </div>
        </CardContent>
      </Card>
      <CreateKeyDialog
        onSuccess={(key) => {
          setNewKey(key)
          setShowCreateKeyForm(false)
        }}
        open={showCreateKeyForm}
        onOpenChange={setShowCreateKeyForm}
      />
      {newKey && (
        <KeyCreatedDialog apiKey={newKey} onClose={() => setNewKey(null)} />
      )}
    </section>
  )
}

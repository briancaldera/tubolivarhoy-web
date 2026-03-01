'use client'

import { CreditCard, LogOut, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CurrentUserAvatar } from '@/components/current-user-avatar'
import { useCurrentUserName } from '@/hooks/use-current-user-name'
import { useSession } from '@/hooks/use-session'
import { useMutation } from '@tanstack/react-query'
import { supabaseClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export const title = 'Profile Dropdown with Status'

export function UserAvatarMenu() {
  const name = useCurrentUserName()
  const session = useSession()
  const router = useRouter()

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const { error } = await supabaseClient.auth.signOut({ scope: 'local' })
      router.push('/')
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='relative h-10 w-10 rounded-full' variant='ghost'>
          <CurrentUserAvatar />
          <span className='absolute right-0 bottom-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-64'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex items-center gap-3'>
            <CurrentUserAvatar />
            <div className='flex flex-col space-y-1'>
              <p className='text-sm leading-none font-medium'>{name}</p>
              <p className='text-xs leading-none text-muted-foreground'>
                {session?.email ?? ''}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          Ver perfil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard />
          Facturación
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Configuración
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
          <LogOut />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

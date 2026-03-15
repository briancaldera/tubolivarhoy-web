'use client'

import { Button } from '@/components/ui/button'
import { googleSignIn } from '@/actions'

export function GoogleSignInButton() {
  return (
    <Button variant='outline' className='w-full' onClick={googleSignIn}>
      <img
        src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png?width=20&height=20&format=auto'
        alt='Google Icon'
        className='size-5'
      />
      <span>Continuar con Google</span>
    </Button>
  )
}

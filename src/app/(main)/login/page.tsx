import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleSignInButton } from '@/components/atoms/google-signin-button'

export default function Page() {
  return (
    <section className='py-20'>
      <Card className='mx-auto max-w-md'>
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex h-48 items-center justify-center'>
            <GoogleSignInButton />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

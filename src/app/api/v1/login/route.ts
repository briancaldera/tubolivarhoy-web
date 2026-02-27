import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { NextResponse as res } from 'next/dist/server/web/spec-extension/response'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const data = z
    .object({
      email: z.email(),
      password: z.string().nonempty(),
    })
    .parse(await req.json())

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error)
    return res.json(
      { message: 'Error al intentar registrar usuario' },
      { status: 500 },
    )

  return res.json(
    { message: 'User logged' },
    {
      status: 200,
    },
  )
}

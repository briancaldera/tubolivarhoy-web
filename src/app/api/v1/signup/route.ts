import { NextRequest, NextResponse as res } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const data = z
    .object({
      email: z.email(),
      password: z.string().nonempty(),
    })
    .parse(await req.json())

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp(data)

  if (error)
    return res.json(
      { message: 'Error al intentar registrar usuario' },
      { status: 500 },
    )

  return res.json(
    { message: 'User registered' },
    {
      status: 200,
    },
  )
}

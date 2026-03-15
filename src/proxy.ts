import { NextRequest, ProxyConfig } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy(req: NextRequest) {
  return await updateSession(req)
}

export const config: ProxyConfig = {
  matcher: ['/auth/:path*'],
}

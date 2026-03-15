import ky from 'ky'
import { z } from 'zod'

export const kyClient = ky.create({
  prefixUrl: z.string().nonempty().parse(process.env.NEXT_PUBLIC_APP_URL),
})

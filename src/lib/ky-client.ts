import ky from 'ky'

export const kyClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_APP_URL,
})

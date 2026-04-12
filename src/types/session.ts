export type Session = Readonly<{
  id: string
  email: string | null
  name: string
  avatar: string | null
  accessToken: string
}>

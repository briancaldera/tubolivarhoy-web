import { Route } from 'next'
import { ReactNode } from 'react'

export type BreadcrumbItem = Readonly<{
  segment: string
  render: ReactNode
  url?: Route
}>

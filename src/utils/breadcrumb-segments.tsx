import { BreadcrumbItem } from '@/types/breadcrumb-item'
import { Home, HomeIcon } from 'lucide-react'

export const breadcrumbSegments: BreadcrumbItem[] = [
  {
    render: <Home className='size-4' />,
    segment: 'auth',
    url: '/auth',
  },
]

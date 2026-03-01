'use client'

import React, { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'
import { breadcrumbSegments } from '@/utils/breadcrumb-segments'
import Link from 'next/link'

export function AuthBreadcrumb() {
  const route = usePathname()
  const segments = route ? route.split('/').filter((s) => s) : []

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const segmentItem = breadcrumbSegments.find(
            (bSegment) => bSegment.segment === segment,
          )

          if (!segmentItem) return <Fragment key={segment}></Fragment>

          return (
            <Fragment key={segment}>
              {index !== segments.length - 1 ? (
                <>
                  <BreadcrumbItem className='hidden md:block'>
                    {segmentItem.url ? (
                      <BreadcrumbLink asChild={true}>
                        <Link href={segmentItem.url} prefetch={false}>
                          {segmentItem.render}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <span>{segmentItem.render}</span>
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{segmentItem.render}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </Fragment>
          )
        })}
        {/*  todo fix breadcrumb link inside item */}
        {/*  <BreadcrumbItem className='hidden md:block'>*/}
        {/*    <BreadcrumbLink href='#'>Build Your Application</BreadcrumbLink>*/}
        {/*  </BreadcrumbItem>*/}
        {/*  <BreadcrumbSeparator className='hidden md:block' />*/}
        {/*  <BreadcrumbItem>*/}
        {/*    <BreadcrumbPage>Data Fetching</BreadcrumbPage>*/}
        {/*  </BreadcrumbItem>*/}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

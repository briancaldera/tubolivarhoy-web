import React from 'react'

export function P({ children, ...props }: { children?: React.ReactNode }) {
  return (
    <p className='text-muted-foreground text-sm leading-7' {...props}>
      {children}
    </p>
  )
}

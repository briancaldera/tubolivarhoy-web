import React from 'react'

export function H1({ children, ...props }: { children?: React.ReactNode }) {
  return (
    <h1
      className='scroll-m-20 text-2xl font-extrabold tracking-tight text-balance'
      {...props}
    >
      {children}
    </h1>
  )
}

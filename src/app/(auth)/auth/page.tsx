'use client'

import { ApiKeysSection } from '@/components/organisms/api-keys-section'
import { MyQuotaSection } from '@/components/organisms/my-quota-section'
import { ChartsSection } from '@/components/organisms/charts-section'

export default function Page() {
  return (
    <main className='space-y-4 p-4'>
      <ChartsSection />
      <ApiKeysSection />
      <MyQuotaSection />
    </main>
  )
}

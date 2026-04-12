'use client'

import { useRatesChangeLastYear } from '@/hooks/use-rates-change-last-year'
import { CurrencyTrendCard } from '@/components/molecules/currency-trend-card'
import { useCurrency } from '@/hooks/use-currency'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CurrencyValues } from '@/types/currency'
import { CurrencyTrendCardSkeleton } from '@/components/molecules/currency-trend-card-skeleton'

export function ChartsSection() {
  const { currency, setCurrency } = useCurrency()
  const { rateChange, isPending } = useRatesChangeLastYear(currency)

  return (
    <section className='@container mx-auto max-w-[1200px]'>
      <div className='grid grid-cols-1 py-4 sm:grid-cols-3'>
        <div className='-col-start-1'>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className='text-tbh-gradient'>
              <SelectValue placeholder='Moneda' />
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectGroup>
                {CurrencyValues.map((currency) => (
                  <SelectItem value={currency} key={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='@container/main'>
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
          {isPending && (
            <>
              <CurrencyTrendCardSkeleton />
              <CurrencyTrendCardSkeleton />
              <CurrencyTrendCardSkeleton />
            </>
          )}
          {rateChange && (
            <>
              <CurrencyTrendCard
                description='Valor hace 1 año'
                currency={rateChange.currency}
                newest={rateChange.latest_rate}
                old={rateChange.rate_1y}
                bottomText={`Valor del ${rateChange.currency} hace 1 año`}
              />
              <CurrencyTrendCard
                description='Valor hace 3 meses'
                currency={rateChange.currency}
                newest={rateChange.latest_rate}
                old={rateChange.rate_90d}
                bottomText={`Valor del ${rateChange.currency} hace 3 meses`}
              />
              <CurrencyTrendCard
                description='Valor hace 7 días'
                currency={rateChange.currency}
                newest={rateChange.latest_rate}
                old={rateChange.rate_7d}
                bottomText={`Valor del ${rateChange.currency} hace 7 días`}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

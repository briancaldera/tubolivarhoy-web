'use client'

import { useState } from 'react'
import { Currency, currencyInfo, CurrencyValues } from '@/types/currency'
import { useQuery } from '@tanstack/react-query'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { supabaseClient } from '@/lib/data/supabase-client'
import { arrayIncludes, assertPresent, isPresent } from 'ts-extras'

const chartConfig = {
  exchange_rate: {
    label: 'Tipo de referencia',
  },
  rate: {
    label: 'Bs. D',
    color: '#ea580c',
  },
} satisfies ChartConfig

export function ExchangeRatesChart() {
  const [currency, setCurrency] = useState<Currency>('USD')

  const query = useQuery({
    queryKey: ['currency', currency],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('exchange_rates_last_month')
        .select('*')
        .eq('currency', currency)

      assertPresent(data)
      return data.toReversed()
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })

  return (
    <section id='datos-historicos' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            <span className='bg-linear-to-r from-primary-start to-primary-end bg-clip-text text-transparent'>
              Datos Históricos
            </span>
          </h2>
          <p className='text-lg text-gray-600'>
            Revisa el valor de los tipos de cambio de referencia en el tiempo
          </p>
        </div>

        <div>
          <Card className='pt-0'>
            <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
              <div className='grid flex-1 gap-1'>
                <CardTitle>
                  Histórico de valores del tipo de cambio de referencia
                </CardTitle>
                <CardDescription>
                  Mostrando el valor del {currency} en el último mes
                </CardDescription>
              </div>
              <Select
                value={currency}
                onValueChange={(value) => {
                  if (arrayIncludes(CurrencyValues, value)) setCurrency(value)
                }}
              >
                <SelectTrigger
                  className='w-[160px] rounded-lg sm:ml-auto sm:flex font-medium text-xs'
                  aria-label='Selecciona una moneda'
                >
                  <SelectValue placeholder='USD' />
                </SelectTrigger>
                <SelectContent className='rounded-xl'>
                  {CurrencyValues.map((value) => (
                    <SelectItem
                      value={value}
                      className='rounded-lg'
                      key={value}
                    >
                      {value} ({currencyInfo[value].symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
              <ChartContainer
                config={chartConfig}
                className='aspect-auto h-[250px] w-full'
              >
                <AreaChart data={query.data}>
                  <defs>
                    <linearGradient id='fillRate' x1='0' y1='0' x2='0' y2='1'>
                      <stop
                        offset='5%'
                        stopColor='#f97316'
                        stopOpacity={0.95}
                      />
                      <stop
                        offset='95%'
                        stopColor='#ec4899'
                        stopOpacity={0.85}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey='registered_at'
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value)
                      return date.toLocaleDateString('es-VE', {
                        month: 'short',
                        day: 'numeric',
                      })
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString('es-VE', {
                            month: 'short',
                            day: 'numeric',
                          })
                        }}
                        indicator='dot'
                      />
                    }
                  />
                  <Area
                    dataKey='rate'
                    type='natural'
                    fill='url(#fillRate)'
                    stroke='#ea580c'
                    stackId='a'
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

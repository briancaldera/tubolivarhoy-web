'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowLeftRight, Loader2Icon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { isPresent, objectEntries } from 'ts-extras'
import { setDefaultOptions } from 'date-fns'
import { es } from 'date-fns/locale'
import { supabaseClient } from '@/lib/supabase/client'
import { currencyInfo } from '@/types/currency'

setDefaultOptions({ locale: es })

function calculate(input: number, base: number, target: number): number {
  return (input / base) * target
}

export default function Calculator() {
  const {
    data,
    error,
    isPending: isLoadingExchangeRates,
  } = useQuery({
    queryKey: ['exchange-rates'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('latest_exchange_rates')
        .select('*')

      if (error) {
        console.error(error)
        return []
      }

      return data
    },
    staleTime: 10 * 60 * 1000,
  })

  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('VED')
  const [result, setResult] = useState(0)

  const exchangeRates = useMemo(() => {
    const res: Record<string, number> = {
      VED: 1,
    }

    for (const exchangeRate of data ?? []) {
      const { currency, rate } = exchangeRate

      if (!isPresent(currency) || !isPresent(rate)) continue

      res[currency] = rate
    }

    return res
  }, [data])

  useEffect(() => {
    // Calculate conversion
    const fromRate = exchangeRates[fromCurrency as keyof typeof exchangeRates]
    const toRate = exchangeRates[toCurrency as keyof typeof exchangeRates]
    const calculatedResult = calculate(amount, toRate, fromRate)
    setResult(calculatedResult)
  }, [amount, fromCurrency, toCurrency, data])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <section id='calculator' className='bg-gray-50 py-20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
            <span className='from-primary-start to-primary-end bg-linear-to-r bg-clip-text text-transparent'>
              Calculadora
            </span>
          </h2>
          <p className='text-lg text-gray-600'>
            Convierte entre monedas con nuestra calculadora fácil de usar
          </p>
        </div>

        <div className='mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md md:p-8'>
          {!isLoadingExchangeRates ? (
            <div>
              <div className='grid grid-cols-1 items-end gap-6 md:grid-cols-5'>
                <div className='space-y-2 md:col-span-2'>
                  <label
                    htmlFor='amount'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Monto
                  </label>
                  <input
                    min={0}
                    inputMode='numeric'
                    type='number'
                    id='amount'
                    value={amount}
                    onChange={(e) =>
                      setAmount(Number.parseFloat(e.target.value) || 0)
                    }
                    className='focus:ring-primary-end w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:outline-none'
                  />
                </div>

                <div className='flex items-center justify-center'>
                  <button
                    type='button'
                    aria-label='Intercambiar monedas'
                    onClick={swapCurrencies}
                    className='rounded-full bg-gray-100 p-3 transition-colors hover:bg-gray-200'
                  >
                    <ArrowLeftRight className='h-5 w-5 text-gray-600' />
                  </button>
                </div>

                <div className='space-y-2 md:col-span-2'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label
                        htmlFor='fromCurrency'
                        className='block text-sm font-medium text-gray-700'
                      >
                        De
                      </label>
                      <select
                        id='fromCurrency'
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className='focus:ring-primary-end w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:outline-none'
                      >
                        {objectEntries(currencyInfo).map(([k, v]) => (
                          <option key={k} value={k}>
                            {k} - {v.name}
                          </option>
                        ))}
                        {/*{CurrencyInfo.map((currency) => (*/}
                        {/*  <option key={currency.code} value={currency.code}>*/}
                        {/*    {currency.code} - {currency.name}*/}
                        {/*  </option>*/}
                        {/*))}*/}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor='toCurrency'
                        className='block text-sm font-medium text-gray-700'
                      >
                        A
                      </label>
                      <select
                        id='toCurrency'
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className='focus:ring-primary-end w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:outline-none'
                      >
                        {objectEntries(currencyInfo).map(([k, v]) => (
                          <option key={k} value={k}>
                            {k} - {v.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8 rounded-lg bg-gray-50 p-6'>
                <div className='text-center'>
                  <p className='mb-2 text-sm text-gray-500'>
                    Monto Equivalente
                  </p>
                  <div className='text-3xl font-bold'>
                    {result.toFixed(2)} {toCurrency}
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                  </p>
                </div>
              </div>

              <div className='mt-6 text-center text-sm text-gray-500'>
                {/*<p>{formatRelative(new Date(), new Date())}</p>*/}
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center'>
              <Loader2Icon className='animate-spin text-gray-500' />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

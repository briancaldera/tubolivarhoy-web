'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowLeftRight, Loader2Icon } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/../generated/database.types'
import { useQuery } from '@tanstack/react-query'
import { isPresent } from 'ts-extras'
import { formatRelative, setDefaultOptions } from 'date-fns'
import { es } from 'date-fns/locale'

setDefaultOptions({ locale: es })

const currencies = [
  { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'CNY', name: 'Yuan', symbol: '¥' },
  { code: 'TRY', name: 'Lira', symbol: '₺' },
  { code: 'RUB', name: 'Rublo', symbol: '₽' },
  { code: 'VED', name: 'Bolívar', symbol: 'Bs. D' },
]

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
)

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
      const { data, error } = await supabase
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
  const [fromCurrency, setFromCurrency] = useState('VED')
  const [toCurrency, setToCurrency] = useState('USD')
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
    <section id='calculator' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            <span className='bg-linear-to-r from-primary-start to-primary-end bg-clip-text text-transparent'>
              Calculadora
            </span>
          </h2>
          <p className='text-lg text-gray-600'>
            Convierte entre monedas con nuestra calculadora fácil de usar
          </p>
        </div>

        <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8'>
          {!isLoadingExchangeRates ? (
            <div>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-6 items-end'>
                <div className='md:col-span-2 space-y-2'>
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
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-end focus:border-transparent'
                  />
                </div>

                <div className='flex justify-center items-center'>
                  <button
                    onClick={swapCurrencies}
                    className='p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
                  >
                    <ArrowLeftRight className='w-5 h-5 text-gray-600' />
                  </button>
                </div>

                <div className='md:col-span-2 space-y-2'>
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
                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-end focus:border-transparent'
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))}
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
                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-end focus:border-transparent'
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8 p-6 bg-gray-50 rounded-lg'>
                <div className='text-center'>
                  <p className='text-sm text-gray-500 mb-2'>
                    Monto Equivalente
                  </p>
                  <div className='text-3xl font-bold'>
                    {result.toFixed(2)} {toCurrency}
                  </div>
                  <p className='text-sm text-gray-500 mt-2'>
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

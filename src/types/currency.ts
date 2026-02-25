export const CurrencyValues = ['USD', 'EUR', 'RUB', 'TRY', 'CNY'] as const

export type Currency = (typeof CurrencyValues)[number]

export const currencyInfo: Record<
  Currency | 'VED',
  { name: string; symbol: string }
> = {
  USD: { name: 'Dólar Estadounidense', symbol: '$' },
  EUR: { name: 'Euro', symbol: '€' },
  CNY: { name: 'Yuan', symbol: '¥' },
  TRY: { name: 'Lira', symbol: '₺' },
  RUB: { name: 'Rublo', symbol: '₽' },
  VED: { name: 'Bolívar', symbol: 'Bs. D' },
}

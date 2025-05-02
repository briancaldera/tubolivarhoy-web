import { useState, useEffect } from "react"
import { ArrowLeftRight } from "lucide-react"

export default function Calculator() {
  const [amount, setAmount] = useState(100)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState(0)

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
    { code: "BRL", name: "Brazilian Real" },
  ]

  // Mock exchange rates
  const exchangeRates = {
    USD: 1,
    EUR: 0.91,
    GBP: 0.78,
    JPY: 149.82,
    CAD: 1.35,
    AUD: 1.52,
    CHF: 0.88,
    CNY: 7.21,
    INR: 83.12,
    BRL: 5.04,
  }

  useEffect(() => {
    // Calculate conversion
    const fromRate = exchangeRates[fromCurrency as keyof typeof exchangeRates]
    const toRate = exchangeRates[toCurrency as keyof typeof exchangeRates]
    const calculatedResult = (amount / fromRate) * toRate
    setResult(calculatedResult)
  }, [amount, fromCurrency, toCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
              Currency Calculator
            </span>
          </h2>
          <p className="text-lg text-gray-600">Convert between currencies with our easy-to-use calculator</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-end focus:border-transparent"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={swapCurrencies}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeftRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <select
                    id="fromCurrency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-end focus:border-transparent"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700">
                    To
                  </label>
                  <select
                    id="toCurrency"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-end focus:border-transparent"
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

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Converted Amount</p>
              <div className="text-3xl font-bold">
                {result.toFixed(2)} {toCurrency}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Exchange rates are for demonstration purposes only and may not reflect current market rates.</p>
          </div>
        </div>
      </div>
    </section>
  )
}


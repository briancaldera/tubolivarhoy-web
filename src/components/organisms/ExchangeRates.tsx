import { useState, useEffect } from "react"
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react"

export default function ExchangeRates() {
  const [rates, setRates] = useState([
    { from: "USD", to: "EUR", rate: 0.91, change: 0.2 },
    { from: "USD", to: "GBP", rate: 0.78, change: -0.1 },
    { from: "USD", to: "JPY", rate: 149.82, change: 0.5 },
    { from: "USD", to: "CAD", rate: 1.35, change: -0.3 },
    { from: "USD", to: "AUD", rate: 1.52, change: 0.1 },
    { from: "USD", to: "CHF", rate: 0.88, change: 0.4 },
  ])

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRates((prevRates) =>
        prevRates.map((rate) => ({
          ...rate,
          rate: Number.parseFloat((rate.rate + (Math.random() * 0.02 - 0.01)).toFixed(4)),
          change: Number.parseFloat((rate.change + (Math.random() * 0.2 - 0.1)).toFixed(2)),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="rates" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
              Live Exchange Rates
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Stay updated with real-time currency exchange rates from around the world
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-gray-600 border-b">
            <div>From</div>
            <div>To</div>
            <div className="col-span-1 md:col-span-3">Rate</div>
            <div className="hidden md:block">Change</div>
          </div>

          <div className="divide-y">
            {rates.map((rate, index) => (
              <div key={index} className="grid grid-cols-3 md:grid-cols-6 gap-4 p-4 items-center">
                <div className="font-medium">{rate.from}</div>
                <div className="font-medium">{rate.to}</div>
                <div className="col-span-1 md:col-span-3 flex items-center">
                  <span className="text-lg font-semibold mr-2">{rate.rate.toFixed(4)}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="ml-2">
                    1 {rate.from} = {rate.rate.toFixed(4)} {rate.to}
                  </span>
                </div>
                <div className={`hidden md:flex items-center ${rate.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {rate.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(rate.change).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


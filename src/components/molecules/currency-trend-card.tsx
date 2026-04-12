import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

export function CurrencyTrendCard({
  currency,
  newest,
  old,
  description,
  bottomText,
}: {
  currency: string
  newest: number
  old: number
  description: string
  bottomText: string
}) {
  const change = (newest - old) / old

  let trendIcon = <MinusIcon />
  let trendMessage = 'Tendencia sin cambio'

  switch (true) {
    case change > 0:
      {
        trendMessage = 'Tendencia a la alza'
        trendIcon = <TrendingUpIcon />
      }
      break
    case change < 0: {
      trendMessage = 'Tendencia a la baja'
      trendIcon = <TrendingDownIcon />
    }
  }

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className='text-tbh-gradient text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          {old.toLocaleString(undefined, {
            style: 'currency',
            currency: 'VED',
          })}
        </CardTitle>
        <div>
          <Badge variant='outline'>
            {trendIcon}
            {change.toLocaleString(undefined, {
              style: 'percent',
              signDisplay: 'exceptZero',
              maximumFractionDigits: 2,
            })}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          {change > 0}
          {trendMessage} {trendIcon}
        </div>
        <div className='text-muted-foreground'>{bottomText}</div>
      </CardFooter>
    </Card>
  )
}

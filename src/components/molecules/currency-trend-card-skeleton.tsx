import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CurrencyTrendCardSkeleton() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardDescription>
          <Skeleton className='h-4 w-24' />
        </CardDescription>
        <CardTitle className='text-tbh-gradient py-0.5 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          <Skeleton className='h-8 w-32 @[250px]/card:h-9 @[250px]/card:w-40' />
        </CardTitle>
        <div>
          <Skeleton className='h-5 w-20 rounded-full' />
        </div>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          <Skeleton className='h-4 w-32' />
        </div>
        <div className='text-muted-foreground'>
          <Skeleton className='h-4 w-48' />
        </div>
      </CardFooter>
    </Card>
  )
}

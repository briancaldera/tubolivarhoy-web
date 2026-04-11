import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { H1 } from '@/components/typography/h1'
import { P } from '@/components/typography/p'
import { useQuota } from '@/hooks/use-quota'
import { Progress } from '@/components/ui/progress'
import { InfoIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function MyQuotaSection() {
  const { quota } = useQuota()

  return (
    <section className='@container mx-auto max-w-[1200px]'>
      <Card>
        <CardHeader className='flex flex-row justify-between'>
          <div>
            <H1>Cuota</H1>
            <P>
              Una vez alcanzada la cuota, las llamadas a la API responderan con
              el status HTTP 429
            </P>
          </div>
          <div>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon size={14} className='text-muted-foreground' />
              </TooltipTrigger>
              <TooltipContent side='right'>
                <p className='text-muted-foreground text-xs'>
                  Una solicitud válida equivale a una solicitud autenticada, sin
                  importar el status de la respuesta.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent>
          {quota && (
            <div>
              <P>{(quota.usage / quota.quota) * 100}%</P>
              <Progress
                value={quota?.usage}
                max={quota?.quota ?? undefined}
                className='[&>[data-slot=progress-indicator]]:from-primary-start [&>[data-slot=progress-indicator]]:to-primary-end [&>[data-slot=progress-indicator]]:bg-gradient-to-r [&>div]:bg-purple-500/20'
              />
              <P>
                {quota.usage} de {quota.quota} solicitudes
              </P>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}

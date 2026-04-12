'use client'

import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { useSession } from '@/hooks/use-session'
import { toast } from 'sonner'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../generated/database.types'

const FormSchema = z.object({
  name: z.string().trim().nonempty('Debe ingresar un nombre'),
})

const ResponseSchema = z.object({
  id: z.string(),
  apiKey: z.string(),
  message: z.string(),
})

export function CreateKeyForm({
  onSuccess,
}: {
  onSuccess: (key: string) => void
}) {
  const session = useSession()

  const queryClient = useQueryClient()
  const createKeyMut = useMutation({
    mutationKey: ['keys', 'create'],
    mutationFn: async ({ name }: { name: string }) => {
      const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      )

      supabase.functions.setAuth(session.user?.accessToken ?? '')
      const { data, error, response } = await supabase.functions.invoke(
        'keys',
        {
          method: 'POST',
          body: {
            name: name,
          },
        },
      )

      if (error) throw error

      return ResponseSchema.parse(data)
    },
    onSuccess: (data) => {
      toast.success('🔑 API key creada.')
      queryClient.invalidateQueries({
        queryKey: ['keys', session.user?.id ?? ''],
      })
      form.reset()
      onSuccess(data.apiKey)
    },
    onError: (error) => {
      toast.error(`❌ Error: ${error.message}`)
      console.error(error)
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: ({ value }) => {
      toast.promise(createKeyMut.mutateAsync({ name: value.name }), {
        loading: 'Creando API key...',
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field
        name='name'
        children={(field) => (
          <Field aria-invalid={!field.state.meta.isValid}>
            <FieldLabel htmlFor={field.name}>Nombre de la API key</FieldLabel>
            <Input
              value={field.state.value}
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              aria-invalid={!field.state.meta.isValid}
            />
            <FieldDescription>
              Escribe un nombre para tu nueva API key
            </FieldDescription>
            {!field.state.meta.isValid && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      <div className='flex justify-end'>
        <Button
          type='submit'
          aria-disabled={createKeyMut.isPending}
          disabled={createKeyMut.isPending}
        >
          {createKeyMut.isPending && <Loader2Icon className='animate-spin' />}
          {createKeyMut.isPending ? 'Creando...' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}

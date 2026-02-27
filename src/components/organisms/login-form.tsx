'use client'

import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { kyClient } from '@/lib/ky-client'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
})

export function LoginForm() {
  const router = useRouter()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: z.infer<typeof loginSchema>) =>
      kyClient.post('api/v1/login', { json: data }),
    onSuccess: (data) => {
      toast.success('Usuario logueado')
      router.push('/auth')
    },
    onError: (error) => {
      console.error(error)
      toast.error('Error')
    },
  })

  const loginForm = useForm({
    validators: {
      onSubmit: loginSchema,
    },
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value)
    },
  })

  const disabled = loginForm.state.isSubmitting

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Inicia sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            loginForm.handleSubmit()
          }}
        >
          <loginForm.Field
            name='email'
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    inputMode='email'
                    type='email'
                    autoComplete='email'
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )
            }}
          />
          <loginForm.Field
            name='password'
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type='password'
                    autoComplete='current-password'
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )
            }}
          />

          <div className='flex justify-end'>
            <Button type='submit' disabled={disabled}>
              Iniciar sesión
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

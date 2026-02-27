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
import { Separator } from '@/components/ui/separator'

const signupSchema = z
  .object({
    email: z.email(),
    password: z.string().nonempty(),
    passwordConfirmation: z.string().nonempty(),
  })
  .refine(
    (values) => values.passwordConfirmation === values.passwordConfirmation,
    'Las contraseñas no coinciden',
  )
  .transform((values) => {
    const { passwordConfirmation, ...rest } = values

    return rest
  })

export function SignUpForm() {
  const router = useRouter()

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: z.infer<typeof signupSchema>) =>
      kyClient.post('api/v1/signup', { json: data }),
    onSuccess: (data) => {
      toast.success('Usuario registrado')
      router.push('/auth')
    },
    onError: (error) => {
      console.error(error)
      toast.error('Error')
    },
  })

  const signupForm = useForm({
    validators: {
      onSubmit: signupSchema,
    },
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: ({ value }) => {
      signupMutation.mutate(value)
    },
  })

  const disabled = signupForm.state.isSubmitting

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Registrarse</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            signupForm.handleSubmit()
          }}
        >
          <signupForm.Field
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
          <signupForm.Field
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
                    autoComplete='new-password'
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )
            }}
          />

          <signupForm.Field
            name='passwordConfirmation'
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Confirmar Contraseña
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type='password'
                    autoComplete='new-password'
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )
            }}
          />

          <div className='flex justify-end'>
            <Button type='submit' disabled={disabled}>
              Registrarse
            </Button>
          </div>
        </form>
        <Separator />
      </CardContent>
    </Card>
  )
}

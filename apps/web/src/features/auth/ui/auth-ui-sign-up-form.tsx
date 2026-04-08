import { useForm } from '@tanstack/react-form'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AuthUiSignUpForm({
  isPending,
  onSubmit,
  onSwitchToSignIn,
}: {
  isPending: boolean
  onSubmit: (value: {
    email: string
    name: string
    password: string
  }) => Promise<void>
  onSwitchToSignIn: () => void
}) {
  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value)
    },
    validators: {
      onSubmit: z.object({
        email: z.email('Invalid email address'),
        name: z.string().min(2, 'Name must be at least 2 characters'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
      }),
    },
  })

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-semibold text-2xl">Create Account</h2>
        <p className="text-muted-foreground text-sm">
          Sign up with your email address.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <form.Field name="name">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Name</Label>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
              />
              {field.state.meta.errors.map((error) => (
                <p className="text-destructive text-sm" key={error?.message}>
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                type="email"
                value={field.state.value}
              />
              {field.state.meta.errors.map((error) => (
                <p className="text-destructive text-sm" key={error?.message}>
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Password</Label>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                type="password"
                value={field.state.value}
              />
              {field.state.meta.errors.map((error) => (
                <p className="text-destructive text-sm" key={error?.message}>
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Subscribe>
          {(state) => (
            <Button
              className="w-full"
              disabled={isPending || !state.canSubmit || state.isSubmitting}
              type="submit"
            >
              {isPending || state.isSubmitting ? 'Submitting...' : 'Sign Up'}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <Button className="w-full" onClick={onSwitchToSignIn} variant="link">
        Already have an account? Sign In
      </Button>
    </div>
  )
}

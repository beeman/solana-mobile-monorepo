import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

import { Card, CardContent } from '@/components/ui/card'

import { useAuthEmailSignIn } from '../data-access/use-auth-email-sign-in'
import { useAuthEmailSignUp } from '../data-access/use-auth-email-sign-up'
import { AuthUiSignInForm } from '../ui/auth-ui-sign-in-form'
import { AuthUiSignUpForm } from '../ui/auth-ui-sign-up-form'

export function AuthFeatureAuthenticateEmail() {
  const navigate = useNavigate()
  const [showSignIn, setShowSignIn] = useState(false)
  const signIn = useAuthEmailSignIn()
  const signUp = useAuthEmailSignUp()

  async function handleSignIn(value: { email: string; password: string }) {
    try {
      await signIn.signInEmail(value)
      toast.success('Sign in successful')
      await navigate({
        to: '/dashboard',
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Sign in failed')
    }
  }

  async function handleSignUp(value: {
    email: string
    name: string
    password: string
  }) {
    try {
      await signUp.signUpEmail(value)
      toast.success('Sign up successful')
      await navigate({
        to: '/dashboard',
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Sign up failed')
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {showSignIn ? (
          <AuthUiSignInForm
            isPending={signIn.isPending}
            onSubmit={handleSignIn}
            onSwitchToSignUp={() => setShowSignIn(false)}
          />
        ) : (
          <AuthUiSignUpForm
            isPending={signUp.isPending}
            onSubmit={handleSignUp}
            onSwitchToSignIn={() => setShowSignIn(true)}
          />
        )}
      </CardContent>
    </Card>
  )
}

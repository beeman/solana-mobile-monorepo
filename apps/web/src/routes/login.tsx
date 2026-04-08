import { createFileRoute } from '@tanstack/react-router'
import { AuthFeatureLogin } from '@/features/auth/feature/auth-feature-login'

export const Route = createFileRoute('/login')({
  component: AuthFeatureLogin,
})

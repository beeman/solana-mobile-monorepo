import { AuthFeatureAuthenticateEmail } from './auth-feature-authenticate-email'
import { AuthFeatureAuthenticatedSolana } from './auth-feature-authenticated-solana'

export function AuthFeatureLogin() {
  return (
    <div className="container mx-auto max-w-md space-y-6 py-8">
      <AuthFeatureAuthenticatedSolana />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>
      <AuthFeatureAuthenticateEmail />
    </div>
  )
}

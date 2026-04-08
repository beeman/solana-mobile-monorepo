import type { UiWallet, UiWalletAccount } from '@wallet-ui/react'
import { LucideKey } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useAuthWalletSignIn } from '@/features/auth/data-access/use-auth-wallet-sign-in'

export function SolanaFeatureWalletSignIn({
  account,
  onError,
  onSuccess,
  wallet,
}: {
  account: UiWalletAccount
  onError(error: unknown): void
  onSuccess(account: UiWalletAccount | undefined): void
  wallet: UiWallet
}) {
  const [statement, setStatement] = useState(
    'Sign in to Solana Mobile Monorepo',
  )
  const { isPending, signInWithWallet } = useAuthWalletSignIn({
    account,
    onError,
    onSuccess: () => onSuccess(account),
    statement,
    wallet,
  })

  const handleSignInClick = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault()
      await signInWithWallet()
    },
    [signInWithWallet],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In with Solana</CardTitle>
        <CardDescription>Authenticate using your Solana wallet</CardDescription>
        <CardAction>
          <Button
            disabled={isPending}
            onClick={handleSignInClick}
            size="lg"
            variant="outline"
          >
            {isPending ? <Spinner /> : <LucideKey />}
            Sign in
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          onChange={(event) => setStatement(event.currentTarget.value)}
          placeholder="Custom sign-in message"
          value={statement}
        />
      </CardContent>
    </Card>
  )
}

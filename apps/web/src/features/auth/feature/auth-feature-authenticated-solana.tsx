import { type UiWallet, useConnect, WalletUiIcon } from '@wallet-ui/react'
import { LucideKey, LucideWallet } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useSolana } from '@/features/solana/data-access/use-solana'

import { useAuthWalletSignIn } from '../data-access/use-auth-wallet-sign-in'

function AuthFeatureAuthenticatedSolanaWalletConnect({
  wallet,
}: {
  wallet: UiWallet
}) {
  const [isConnecting, connect] = useConnect(wallet)

  return (
    <Button
      className="w-full justify-start gap-2"
      disabled={isConnecting}
      onClick={() => {
        void connect().catch((error) => {
          toast.error(String(error))
        })
      }}
      variant="outline"
    >
      {isConnecting ? (
        <Spinner className="size-5" />
      ) : (
        <WalletUiIcon className="size-5" wallet={wallet} />
      )}
      <span className="flex-1 text-left">Connect {wallet.name}</span>
    </Button>
  )
}

function AuthFeatureAuthenticatedSolanaWalletSignIn({
  wallet,
}: {
  wallet: UiWallet
}) {
  const account = wallet.accounts[0]
  const { isPending, signInWithWallet } = useAuthWalletSignIn({
    account,
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Sign in failed')
    },
    onSuccess: () => {
      toast.success('Signed in successfully')
    },
    wallet,
  })

  return (
    <Button
      className="w-full justify-start gap-2"
      disabled={isPending}
      onClick={() => {
        void signInWithWallet()
      }}
      variant="secondary"
    >
      {isPending ? (
        <Spinner className="size-5" />
      ) : (
        <WalletUiIcon className="size-5" wallet={wallet} />
      )}
      <span className="flex-1 text-left">Sign in with {wallet.name}</span>
      <LucideKey className="size-4" />
    </Button>
  )
}

export function AuthFeatureAuthenticatedSolana() {
  const { wallets } = useSolana()

  if (wallets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LucideWallet className="size-5" />
            Sign in with Solana
          </CardTitle>
          <CardDescription>
            No Solana wallets detected. Please install a wallet extension.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LucideWallet className="size-5" />
          Sign in with Solana
        </CardTitle>
        <CardDescription>
          Connect your wallet to sign in securely.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {wallets.map((wallet) =>
          wallet.accounts[0] ? (
            <AuthFeatureAuthenticatedSolanaWalletSignIn
              key={wallet.name}
              wallet={wallet}
            />
          ) : (
            <AuthFeatureAuthenticatedSolanaWalletConnect
              key={wallet.name}
              wallet={wallet}
            />
          ),
        )}
      </CardContent>
    </Card>
  )
}

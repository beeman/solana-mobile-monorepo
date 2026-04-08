import { type UiWallet, useDisconnect } from '@wallet-ui/react'
import { LucideUnplug } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export function SolanaFeatureWalletDisconnect({
  wallet,
}: {
  wallet: UiWallet
}) {
  const [isLoading, disconnect] = useDisconnect(wallet)

  return (
    <Button
      disabled={isLoading}
      onClick={() => disconnect()}
      size="sm"
      variant="secondary"
    >
      {isLoading ? <Spinner /> : <LucideUnplug />}
      Disconnect
    </Button>
  )
}

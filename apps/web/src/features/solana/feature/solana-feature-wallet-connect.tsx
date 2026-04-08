import { type UiWallet, useConnect } from '@wallet-ui/react'
import { LucidePlug } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export function SolanaFeatureWalletConnect({ wallet }: { wallet: UiWallet }) {
  const [isLoading, connect] = useConnect(wallet)

  return (
    <Button
      disabled={isLoading}
      onClick={async () =>
        connect().catch((error) => {
          toast.error(`Error connecting wallet: ${error}`)
        })
      }
      size="sm"
      variant="secondary"
    >
      {isLoading ? <Spinner /> : <LucidePlug />}
      Connect
    </Button>
  )
}

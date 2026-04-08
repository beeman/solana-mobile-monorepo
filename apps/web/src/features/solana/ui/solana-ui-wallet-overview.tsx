import type { UiWallet } from '@wallet-ui/react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { SolanaUiWalletFeatures } from './solana-ui-wallet-features'

export function SolanaUiWalletOverview({ wallet }: { wallet: UiWallet }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <SolanaUiWalletFeatures
              all={[
                'solana:signAndSendTransaction',
                'solana:signIn',
                'solana:signMessage',
                'solana:signTransaction',
              ]}
              selected={wallet.features
                .filter((feature) => feature.startsWith('solana:'))
                .sort()}
              title="Features"
            />
          </div>
          <div className="col-span-1">
            <SolanaUiWalletFeatures
              all={[
                'solana:devnet',
                'solana:localnet',
                'solana:mainnet',
                'solana:testnet',
              ]}
              selected={wallet.chains
                .filter((chain) => chain.startsWith('solana:'))
                .sort()}
              title="Chains"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

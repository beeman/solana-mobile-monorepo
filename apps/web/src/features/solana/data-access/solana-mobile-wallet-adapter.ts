import {
  createDefaultAuthorizationCache,
  createDefaultChainSelector,
  createDefaultWalletNotFoundHandler,
  registerMwa,
} from '@solana-mobile/wallet-standard-mobile'
import type { SolanaCluster } from '@wallet-ui/react'

export function solanaMobileWalletAdapter({
  appIdentity = { name: 'Wallet UI' },
  clusters,
}: {
  appIdentity?: { icon?: string; name: string; uri?: string }
  clusters: SolanaCluster[]
}) {
  if (typeof window === 'undefined') {
    return
  }

  if (!window.isSecureContext) {
    console.warn(
      'Solana Mobile Wallet Adapter not loaded: https connection required',
    )
    return
  }

  const chains = clusters.map((cluster) => cluster.id)

  if (!chains.length) {
    console.warn(
      'Solana Mobile Wallet Adapter not loaded: no clusters provided',
    )
    return
  }

  registerMwa({
    appIdentity,
    authorizationCache: createDefaultAuthorizationCache(),
    chains,
    chainSelector: createDefaultChainSelector(),
    onWalletNotFound: createDefaultWalletNotFoundHandler(),
  })

  console.log('Loaded Solana Mobile Wallet Adapter')
}

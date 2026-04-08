import {
  isWalletStandardError,
  WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
  WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED,
  WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED,
} from '@wallet-ui/react'
import type { ReactNode } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function getErrorMessage(
  error: unknown,
  fallbackMessage: ReactNode,
): ReactNode {
  if (
    isWalletStandardError(
      error,
      WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED,
    )
  ) {
    return (
      <div>
        This account does not support the{' '}
        <code>{error.context.featureName}</code> feature.
      </div>
    )
  }

  if (
    isWalletStandardError(
      error,
      WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED,
    )
  ) {
    return (
      <div>
        The wallet '{error.context.walletName}' does not support the{' '}
        <code>{error.context.featureName}</code> feature.
      </div>
    )
  }

  if (
    isWalletStandardError(
      error,
      WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
    )
  ) {
    return (
      <div className="flex flex-col gap-4">
        <p>
          This account does not support the chain{' '}
          <code>{error.context.chain}</code>.
        </p>
        <div>
          <p>Chains supported:</p>
          <ul>
            {error.context.supportedChains.sort().map((chain) => (
              <li key={chain}>
                <code>{chain}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return fallbackMessage
}

export function SolanaUiError({
  error,
  title,
}: {
  error: unknown
  title?: string
}) {
  return (
    <Alert>
      <AlertTitle className="text-destructive">
        {title ?? 'We encountered the following error'}
      </AlertTitle>
      <AlertDescription>
        {getErrorMessage(error, 'Unknown error occurred')}
      </AlertDescription>
    </Alert>
  )
}

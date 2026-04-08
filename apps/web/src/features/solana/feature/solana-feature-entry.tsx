import {
  type SolanaClusterId,
  type UiWallet,
  WalletUiIcon,
} from '@wallet-ui/react'
import { Fragment, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { toast } from 'sonner'

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useSolana } from '../data-access/use-solana'
import { useSolanaBalance } from '../data-access/use-solana-balance'
import { SolanaUiAddressForm } from '../ui/solana-ui-address-form'
import { SolanaUiBalanceResult } from '../ui/solana-ui-balance-result'
import { SolanaUiError } from '../ui/solana-ui-error'
import { SolanaUiExplorerLink } from '../ui/solana-ui-explorer-link'
import { SolanaUiWalletAddress } from '../ui/solana-ui-wallet-address'
import { SolanaUiWalletOverview } from '../ui/solana-ui-wallet-overview'
import { SolanaFeatureWalletConnect } from './solana-feature-wallet-connect'
import { SolanaFeatureWalletDisconnect } from './solana-feature-wallet-disconnect'
import { SolanaFeatureWalletSelect } from './solana-feature-wallet-select'
import { SolanaFeatureWalletSignAndSendTransaction } from './solana-feature-wallet-sign-and-send-transaction'
import { SolanaFeatureWalletSignIn } from './solana-feature-wallet-sign-in'
import { SolanaFeatureWalletSignMessage } from './solana-feature-wallet-sign-message'
import { SolanaFeatureWalletSignTransaction } from './solana-feature-wallet-sign-transaction'

export function SolanaFeatureEntry() {
  const { client, cluster, wallet } = useSolana()
  const [address, setAddress] = useState(
    'SEekKY1iUoWYJqZ3d9QBsfJytNx5RLBjBmgznkGrqbH',
  )
  const balanceMutation = useSolanaBalance()

  function handleCheckBalance() {
    const trimmedAddress = address.trim()

    if (trimmedAddress.length) {
      balanceMutation.mutate({ address: trimmedAddress })
    }
  }

  const errorMessage = (() => {
    if (!balanceMutation.isError || !balanceMutation.error) {
      return undefined
    }

    return typeof balanceMutation.error === 'object' &&
      'message' in balanceMutation.error &&
      typeof balanceMutation.error.message === 'string'
      ? balanceMutation.error.message
      : 'Unable to fetch balance'
  })()

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 py-10">
      {wallet ? (
        <SolanaFeatureWalletSection
          client={client}
          cluster={cluster.id}
          wallet={wallet}
        />
      ) : (
        <SolanaFeatureWalletSelect />
      )}

      <div className="space-y-4">
        <SolanaUiAddressForm
          address={address}
          isLoading={balanceMutation.isPending}
          onAddressChange={setAddress}
          onCheckBalance={handleCheckBalance}
        />
        <SolanaUiBalanceResult
          balance={balanceMutation.data?.value}
          errorMessage={errorMessage}
          isError={balanceMutation.isError}
          isIdle={balanceMutation.isIdle}
          isLoading={balanceMutation.isPending}
        />
      </div>
    </div>
  )
}

function SolanaFeatureWalletSection({
  client,
  cluster,
  wallet,
}: {
  client: ReturnType<typeof useSolana>['client']
  cluster: SolanaClusterId
  wallet: UiWallet
}) {
  const connected = Boolean(wallet.accounts?.length)
  const account = wallet.accounts.length ? wallet.accounts[0] : undefined

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <WalletUiIcon className="size-8" wallet={wallet} />
            <span>{wallet.name}</span>
          </CardTitle>
          <CardDescription>
            {connected ? (
              <SolanaUiWalletAddress address={account?.address} />
            ) : (
              `Connect to ${wallet.name} to see the accounts`
            )}
          </CardDescription>
          <CardAction className="space-x-2">
            {connected ? (
              <SolanaFeatureWalletDisconnect wallet={wallet} />
            ) : (
              <SolanaFeatureWalletConnect wallet={wallet} />
            )}
          </CardAction>
        </CardHeader>
      </Card>
      <SolanaUiWalletOverview wallet={wallet} />
      {account ? (
        <Fragment>
          <ErrorBoundary
            fallbackRender={({ error }) => <SolanaUiError error={error} />}
            resetKeys={[wallet.name]}
          >
            <SolanaFeatureWalletSignIn
              account={account}
              onError={(error) =>
                toast.error('Error signing in', {
                  description: `${error}`,
                })
              }
              onSuccess={(nextAccount) =>
                toast.success('Signing in success', {
                  description: (
                    <SolanaUiWalletAddress address={nextAccount?.address} />
                  ),
                })
              }
              wallet={wallet}
            />
          </ErrorBoundary>
          <ErrorBoundary
            fallbackRender={({ error }) => <SolanaUiError error={error} />}
            resetKeys={[wallet.name]}
          >
            <SolanaFeatureWalletSignMessage
              account={account}
              onError={(error) =>
                toast.error('Error signing message', {
                  description: `${error}`,
                })
              }
              onSuccess={(signature) =>
                toast.success('Signing message success', {
                  description: (
                    <SolanaUiWalletAddress address={signature} len={10} />
                  ),
                })
              }
            />
          </ErrorBoundary>
          <ErrorBoundary
            fallbackRender={({ error }) => <SolanaUiError error={error} />}
            resetKeys={[wallet.name]}
          >
            <SolanaFeatureWalletSignAndSendTransaction
              account={account}
              client={client}
              cluster={cluster}
              onError={(error) =>
                toast.error('Error signing and sending transaction', {
                  description: `${error}`,
                })
              }
              onSuccess={(signature) =>
                toast.success('Signing and sending transaction success', {
                  description: (
                    <SolanaUiExplorerLink
                      label={
                        <SolanaUiWalletAddress address={signature} len={10} />
                      }
                      path={`/tx/${signature}`}
                    />
                  ),
                })
              }
            />
          </ErrorBoundary>
          <ErrorBoundary
            fallbackRender={({ error }) => <SolanaUiError error={error} />}
            resetKeys={[wallet.name]}
          >
            <SolanaFeatureWalletSignTransaction
              account={account}
              client={client}
              cluster={cluster}
              onError={(error) =>
                toast.error('Error signing transaction', {
                  description: `${error}`,
                })
              }
              onSuccess={(signature) =>
                toast.success('Signing transaction success', {
                  description: (
                    <SolanaUiExplorerLink
                      label={
                        <SolanaUiWalletAddress address={signature} len={10} />
                      }
                      path={`/tx/${signature}`}
                    />
                  ),
                })
              }
            />
          </ErrorBoundary>
        </Fragment>
      ) : null}
    </div>
  )
}

import { useState } from 'react'
import { View } from 'react-native'

import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'
import { ShellUiScrollView } from '@/features/shell/ui/shell-ui-scroll-view'
import { useSolanaBalance } from '@/features/solana/data-access/use-solana-balance'
import { SolanaUiAddressForm } from '@/features/solana/ui/solana-ui-address-form'
import { SolanaUiBalanceResult } from '@/features/solana/ui/solana-ui-balance-result'

export function SolanaFeatureEntry() {
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
    if (!balanceMutation.isError || !balanceMutation.error) return undefined

    return typeof balanceMutation.error === 'object' &&
      'message' in balanceMutation.error &&
      typeof balanceMutation.error.message === 'string'
      ? balanceMutation.error.message
      : 'Unable to fetch balance'
  })()

  return (
    <ShellUiScrollView>
      <View className="flex-1 p-4">
        <ShellUiPageHeader
          description="Check the balance of any Solana address"
          icon="wallet-outline"
          title="Solana Balance"
        />

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
      </View>
    </ShellUiScrollView>
  )
}

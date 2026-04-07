import { Ionicons } from '@expo/vector-icons'
import { Spinner, Surface, useThemeColor } from 'heroui-native'
import { Text, View } from 'react-native'

type SolanaUiBalanceResultProps = {
  balance?: string | number | bigint | null
  errorMessage?: string
  isError: boolean
  isIdle: boolean
  isLoading: boolean
}

export function SolanaUiBalanceResult({
  balance,
  errorMessage,
  isError,
  isIdle,
  isLoading,
}: SolanaUiBalanceResultProps) {
  const mutedColor = useThemeColor('muted')
  const dangerColor = useThemeColor('danger')

  if (isIdle) {
    return (
      <Surface variant="secondary" className="rounded-xl p-6">
        <View className="items-center py-6">
          <Ionicons
            name="information-circle-outline"
            size={32}
            color={mutedColor}
          />
          <Text className="mt-3 text-center text-muted text-sm italic">
            Enter an address and click search to check the balance
          </Text>
        </View>
      </Surface>
    )
  }

  if (isLoading) {
    return (
      <Surface variant="secondary" className="rounded-xl p-6">
        <View className="items-center py-6">
          <Spinner size="lg" />
          <Text className="mt-3 text-muted text-sm">Fetching balance...</Text>
        </View>
      </Surface>
    )
  }

  if (isError) {
    return (
      <Surface variant="secondary" className="rounded-xl p-6">
        <View className="items-center py-6">
          <Ionicons name="alert-circle-outline" size={32} color={dangerColor} />
          <Text className="mt-2 text-center text-danger text-sm">
            Error: {errorMessage}
          </Text>
        </View>
      </Surface>
    )
  }

  const formattedBalance =
    balance !== undefined
      ? (Number(balance) / 1_000_000_000).toLocaleString(undefined, {
          minimumFractionDigits: 9,
        })
      : '0.000000000'

  return (
    <Surface variant="secondary" className="rounded-xl p-6">
      <Text className="text-muted text-sm">Current Balance</Text>
      <View className="mt-2 flex-row items-baseline gap-2">
        <Text className="font-bold text-4xl text-foreground">
          {formattedBalance}
        </Text>
        <Text className="font-semibold text-muted text-xl">SOL</Text>
      </View>
    </Surface>
  )
}

import { Ionicons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import {
  Button,
  Input,
  Spinner,
  Surface,
  TextField,
  useThemeColor,
} from 'heroui-native'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Container } from '@/components/container'
import { orpc } from '@/utils/orpc'

export default function SolanaScreen() {
  const [address, setAddress] = useState(
    'SEekKY1iUoWYJqZ3d9QBsfJytNx5RLBjBmgznkGrqbH',
  )

  const balanceMutation = useMutation({
    ...orpc.solana.getBalance.mutationOptions(),
  })

  const mutedColor = useThemeColor('muted')
  const dangerColor = useThemeColor('danger')
  const foregroundColor = useThemeColor('foreground')

  const handleCheckBalance = () => {
    if (address.trim()) {
      balanceMutation.mutate({ address })
    }
  }

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <View className="mb-4 py-4">
          <View className="flex-row items-center gap-2">
            <Ionicons name="wallet-outline" size={24} color={foregroundColor} />
            <Text className="font-semibold text-2xl text-foreground tracking-tight">
              Solana Balance
            </Text>
          </View>
          <Text className="mt-1 text-muted text-sm">
            Check the balance of any Solana address
          </Text>
        </View>

        <Surface variant="secondary" className="mb-6 rounded-lg p-4">
          <Text className="mb-2 font-medium text-foreground text-sm">
            Wallet Address
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <TextField>
                <Input
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter Solana address..."
                  editable={!balanceMutation.isPending}
                  onSubmitEditing={handleCheckBalance}
                  returnKeyType="search"
                />
              </TextField>
            </View>
            <Button
              isIconOnly
              variant={
                balanceMutation.isPending || !address.trim()
                  ? 'secondary'
                  : 'primary'
              }
              isDisabled={balanceMutation.isPending || !address.trim()}
              onPress={handleCheckBalance}
              size="sm"
            >
              {balanceMutation.isPending ? (
                <Spinner size="sm" color="default" />
              ) : (
                <Ionicons
                  name="search"
                  size={20}
                  color={
                    balanceMutation.isPending || !address.trim()
                      ? mutedColor
                      : foregroundColor
                  }
                />
              )}
            </Button>
          </View>
        </Surface>

        <Surface variant="secondary" className="rounded-xl p-6">
          {balanceMutation.isIdle ? (
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
          ) : balanceMutation.isPending ? (
            <View className="items-center py-6">
              <Spinner size="lg" />
              <Text className="mt-3 text-muted text-sm">
                Fetching balance...
              </Text>
            </View>
          ) : balanceMutation.isError ? (
            <View className="items-center py-6">
              <Ionicons
                name="alert-circle-outline"
                size={32}
                color={dangerColor}
              />
              <Text className="mt-2 text-center text-danger text-sm">
                Error: {balanceMutation.error.message}
              </Text>
            </View>
          ) : (
            <View>
              <Text className="text-muted text-sm">Current Balance</Text>
              <View className="mt-2 flex-row items-baseline gap-2">
                <Text className="font-bold text-4xl text-foreground">
                  {balanceMutation.data?.value !== undefined
                    ? (
                        Number(balanceMutation.data.value) / 1_000_000_000
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 9,
                      })
                    : '0.000000000'}
                </Text>
                <Text className="font-semibold text-muted text-xl">SOL</Text>
              </View>
            </View>
          )}
        </Surface>
      </ScrollView>
    </Container>
  )
}

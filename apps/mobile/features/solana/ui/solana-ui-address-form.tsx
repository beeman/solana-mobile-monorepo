import { Ionicons } from '@expo/vector-icons'
import {
  Button,
  Input,
  Spinner,
  Surface,
  TextField,
  useThemeColor,
} from 'heroui-native'
import { Text, View } from 'react-native'

type SolanaUiAddressFormProps = {
  address: string
  isLoading: boolean
  onAddressChange: (address: string) => void
  onCheckBalance: () => void
}

export function SolanaUiAddressForm({
  address,
  isLoading,
  onAddressChange,
  onCheckBalance,
}: SolanaUiAddressFormProps) {
  const mutedColor = useThemeColor('muted')
  const foregroundColor = useThemeColor('foreground')

  const isDisabled = isLoading || !address.trim()

  return (
    <Surface variant="secondary" className="mb-6 rounded-lg p-4">
      <Text className="mb-2 font-medium text-foreground text-sm">
        Wallet Address
      </Text>
      <View className="flex-row items-center gap-2">
        <View className="flex-1">
          <TextField>
            <Input
              value={address}
              onChangeText={onAddressChange}
              placeholder="Enter Solana address..."
              editable={!isLoading}
              onSubmitEditing={onCheckBalance}
              returnKeyType="search"
            />
          </TextField>
        </View>
        <Button
          isIconOnly
          variant={isDisabled ? 'secondary' : 'primary'}
          isDisabled={isDisabled}
          onPress={onCheckBalance}
          size="sm"
        >
          {isLoading ? (
            <Spinner size="sm" color="default" />
          ) : (
            <Ionicons
              name="search"
              size={20}
              color={isDisabled ? mutedColor : foregroundColor}
            />
          )}
        </Button>
      </View>
    </Surface>
  )
}

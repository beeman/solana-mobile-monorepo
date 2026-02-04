import { useMobileWallet } from '@wallet-ui/react-native-kit'
import { Button, Card } from 'heroui-native'
import { Text, View } from 'react-native'
import { ellipsify } from '@/utils/ellipsify'

export function SolanaConnect() {
  const { account, connect, disconnect } = useMobileWallet()

  return (
    <Card className="gap-4">
      <Card.Body>
        {account ? (
          <View className="gap-1">
            <Card.Title>{account.label}</Card.Title>
            <Text className="text-muted text-xs" numberOfLines={1}>
              {ellipsify(account.address)}
            </Text>
          </View>
        ) : (
          <View className="gap-1">
            <Card.Title>Solana Wallet</Card.Title>
          </View>
        )}
      </Card.Body>
      <Card.Footer>
        {account ? (
          <Button variant="outline" size="sm" onPress={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button variant="primary" className="w-full" onPress={connect}>
            Connect
          </Button>
        )}
      </Card.Footer>
    </Card>
  )
}

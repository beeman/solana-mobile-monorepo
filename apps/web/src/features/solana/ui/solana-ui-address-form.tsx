import { Search, Wallet } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function SolanaUiAddressForm({
  address,
  isLoading,
  onAddressChange,
  onCheckBalance,
}: {
  address: string
  isLoading: boolean
  onAddressChange: (value: string) => void
  onCheckBalance: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          Solana Balance
        </CardTitle>
        <CardDescription>
          Check the balance of any Solana address.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          className="space-y-2"
          onSubmit={(event) => {
            event.preventDefault()
            onCheckBalance()
          }}
        >
          <label className="font-medium text-sm" htmlFor="address">
            Wallet Address
          </label>
          <div className="flex gap-2">
            <Input
              disabled={isLoading}
              id="address"
              onChange={(event) => onAddressChange(event.target.value)}
              placeholder="Enter Solana address..."
              value={address}
            />
            <Button disabled={isLoading || !address.trim()} type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

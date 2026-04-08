import { Loader2 } from 'lucide-react'

export function SolanaUiBalanceResult({
  balance,
  errorMessage,
  isError,
  isIdle,
  isLoading,
}: {
  balance: bigint | number | string | undefined
  errorMessage?: string
  isError: boolean
  isIdle: boolean
  isLoading: boolean
}) {
  return (
    <div className="rounded-lg bg-muted p-4">
      {isIdle ? (
        <div className="py-4 text-center text-muted-foreground italic">
          Enter an address and click search to check the balance
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : isError ? (
        <div className="py-4 text-center text-destructive">
          Error: {errorMessage || 'Unable to fetch balance'}
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">Balance</p>
          <p className="font-bold text-3xl">
            {balance !== undefined
              ? (Number(balance) / 1_000_000_000).toLocaleString(undefined, {
                  minimumFractionDigits: 9,
                })
              : '0.000000000'}{' '}
            SOL
          </p>
        </div>
      )}
    </div>
  )
}

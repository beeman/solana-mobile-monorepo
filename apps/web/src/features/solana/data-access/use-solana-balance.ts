import { useMutation } from '@tanstack/react-query'

import { orpc } from '@/lib/orpc'

export function useSolanaBalance() {
  return useMutation({
    ...orpc.solana.getBalance.mutationOptions(),
  })
}

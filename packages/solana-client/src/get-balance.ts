import type { Address } from '@solana/kit'
import type { SolanaClient } from './solana-client'

export async function getBalance(
  client: Pick<SolanaClient, 'rpc'>,
  address: Address,
) {
  return client.rpc.getBalance(address).send()
}

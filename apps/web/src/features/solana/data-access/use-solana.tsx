import {
  appendTransactionMessageInstructions,
  createTransactionMessage,
  getBase58Decoder,
  type Instruction,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
  type TransactionSigner,
} from '@solana/kit'
import { createSolanaClient } from '@solana-mobile-monorepo/solana-client'
import { type GetExplorerUrlProps, useWalletUi } from '@wallet-ui/react'
import { useCallback } from 'react'

export function useSolana() {
  const { cluster, ...walletUi } = useWalletUi()
  const client = createSolanaClient({ url: cluster.url })
  const explorer: Omit<GetExplorerUrlProps, 'path'> = {
    network: cluster,
    provider: 'solana',
  }

  const signAndSendTransaction = useCallback(
    async ({
      ixs,
      signer,
    }: {
      ixs: Instruction[]
      signer: TransactionSigner
    }) => {
      const { value: latestBlockhash } = await client.rpc
        .getLatestBlockhash()
        .send()
      const transaction = pipe(
        createTransactionMessage({ version: 0 }),
        (message) => setTransactionMessageFeePayerSigner(signer, message),
        (message) =>
          setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, message),
        (message) => appendTransactionMessageInstructions(ixs, message),
      )
      const signatureBytes =
        await signAndSendTransactionMessageWithSigners(transaction)

      return getBase58Decoder().decode(signatureBytes)
    },
    [client],
  )

  return {
    ...walletUi,
    client,
    cluster,
    explorer,
    signAndSendTransaction,
  }
}

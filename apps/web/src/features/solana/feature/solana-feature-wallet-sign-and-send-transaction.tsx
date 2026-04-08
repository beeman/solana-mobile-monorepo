import {
  appendTransactionMessageInstruction,
  assertIsTransactionMessageWithSingleSendingSigner,
  createTransactionMessage,
  getBase58Decoder,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
} from '@solana/kit'
import type { SolanaClient } from '@solana-mobile-monorepo/solana-client'
import { getAddMemoInstruction } from '@solana-program/memo'
import type { SolanaClusterId, UiWalletAccount } from '@wallet-ui/react'
import { useWalletAccountTransactionSendingSigner } from '@wallet-ui/react'
import { LucideKey } from 'lucide-react'
import { type SyntheticEvent, useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

import { getErrorMessage } from '../ui/solana-ui-error'

export function SolanaFeatureWalletSignAndSendTransaction({
  account,
  client,
  cluster,
  onError,
  onSuccess,
}: {
  account: UiWalletAccount
  client: SolanaClient
  cluster: SolanaClusterId
  onError(error: unknown): void
  onSuccess(signature: string | undefined): void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('Hello Solana!')
  const transactionSigner = useWalletAccountTransactionSendingSigner(
    account,
    cluster,
  )

  const signTransaction = useCallback(async () => {
    const { value: latestBlockhash } = await client.rpc
      .getLatestBlockhash({ commitment: 'confirmed' })
      .send()
    const message = pipe(
      createTransactionMessage({ version: 0 }),
      (transaction) =>
        setTransactionMessageFeePayerSigner(transactionSigner, transaction),
      (transaction) =>
        setTransactionMessageLifetimeUsingBlockhash(
          latestBlockhash,
          transaction,
        ),
      (transaction) =>
        appendTransactionMessageInstruction(
          getAddMemoInstruction({ memo: text }),
          transaction,
        ),
    )

    assertIsTransactionMessageWithSingleSendingSigner(message)

    const signatureBytes =
      await signAndSendTransactionMessageWithSigners(message)
    const signature = getBase58Decoder().decode(signatureBytes)

    if (!signature) {
      throw new Error()
    }

    return signature
  }, [client.rpc, text, transactionSigner])

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
          const signature = await signTransaction()
          onSuccess(signature)
        } catch (error) {
          onError(getErrorMessage(error, 'Unknown error occurred'))
        } finally {
          setIsLoading(false)
        }
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Sign and Send Transaction</CardTitle>
          <CardDescription>
            Sign and send a transaction with a memo text
          </CardDescription>
          <CardAction>
            <Button
              disabled={!text || isLoading}
              size="lg"
              type="submit"
              variant="outline"
            >
              {isLoading ? <Spinner /> : <LucideKey />}
              Sign Transaction
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            onChange={(event: SyntheticEvent<HTMLInputElement>) =>
              setText(event.currentTarget.value)
            }
            placeholder="Write a memo text to sign and send as a transaction"
            value={text}
          />
        </CardContent>
      </Card>
    </form>
  )
}

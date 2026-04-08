import { type Address, getBase64Decoder } from '@solana/kit'
import {
  type ReadonlyUint8Array,
  type UiWalletAccount,
  useWalletAccountMessageSigner,
} from '@wallet-ui/react'
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

export function SolanaFeatureWalletSignMessage({
  account,
  onError,
  onSuccess,
}: {
  account: UiWalletAccount
  onError(error: unknown): void
  onSuccess(signature: string | undefined): void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('Hello Solana!')
  const messageSigner = useWalletAccountMessageSigner(account)

  const signMessage = useCallback(
    async (message: ReadonlyUint8Array) => {
      const [result] = await messageSigner.modifyAndSignMessages([
        {
          content: message as Uint8Array,
          signatures: {},
        },
      ])
      const signature = result?.signatures[account.address as Address]

      if (!signature) {
        throw new Error()
      }

      return signature as ReadonlyUint8Array
    },
    [account.address, messageSigner],
  )

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
          const signature = await signMessage(new TextEncoder().encode(text))
          onSuccess(getBase64Decoder().decode(signature))
        } catch (error) {
          onError(getErrorMessage(error, 'Unknown error occurred'))
        } finally {
          setIsLoading(false)
        }
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Sign Message</CardTitle>
          <CardDescription>Sign a message with this text</CardDescription>
          <CardAction>
            <Button
              disabled={!text || isLoading}
              size="lg"
              type="submit"
              variant="outline"
            >
              {isLoading ? <Spinner /> : <LucideKey />}
              Sign Message
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            onChange={(event: SyntheticEvent<HTMLInputElement>) =>
              setText(event.currentTarget.value)
            }
            placeholder="Write a message to sign"
            value={text}
          />
        </CardContent>
      </Card>
    </form>
  )
}

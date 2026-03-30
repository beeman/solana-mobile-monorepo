import {
  type Address,
  assertIsSignature,
  getBase58Decoder,
  type Signature,
} from '@solana/kit'
import type {
  SolanaSignInInput,
  SolanaSignInOutput,
  WalletAccount,
} from '@wallet-ui/react'
import {
  createSIWSInput,
  type SIWSNonceResponse,
} from 'better-auth-solana/client'
import { authClient } from '@/lib/auth-client'

export async function handleSiwsAuth({
  address,
  refresh,
  signIn,
  statement,
}: {
  address: Address
  refresh: () => Promise<void>
  signIn: (input: SolanaSignInInput) => Promise<SolanaSignInOutput>
  statement: string
}) {
  const challenge = await fetchNonce({ address })
  const { message, signature } = await createAndSignMessage({
    address,
    challenge,
    signIn,
    statement,
  })
  const verifyData = await verifyMessage({
    address,
    message,
    signature,
  })

  await refresh()

  return verifyData
}

async function fetchNonce({
  address,
}: {
  address: Address
}): Promise<SIWSNonceResponse> {
  const result = await authClient.siws.nonce({
    walletAddress: address,
  })

  if (!result.data) {
    throw new Error(result.error?.message || 'Failed to fetch nonce')
  }

  return result.data
}

async function createAndSignMessage({
  address,
  challenge,
  signIn,
  statement,
}: {
  address: Address
  challenge: SIWSNonceResponse
  signIn: (input: SolanaSignInInput) => Promise<SolanaSignInOutput>
  statement: string
}): Promise<{ account: WalletAccount; message: string; signature: Signature }> {
  const input = createSignInInput({ address, challenge, statement })
  const { account, signedMessage, signature } = await signIn(input)

  return {
    account,
    message: new TextDecoder().decode(signedMessage),
    signature: signatureBytesToSignature(signature),
  }
}

function signatureBytesToSignature(bytes: Uint8Array<ArrayBufferLike>) {
  const signature = getBase58Decoder().decode(bytes)
  assertIsSignature(signature)
  return signature
}

function createSignInInput({
  address,
  challenge,
  statement,
}: {
  address: Address
  challenge: SIWSNonceResponse
  statement: string
}): SolanaSignInInput {
  return createSIWSInput({ address, challenge, statement })
}

async function verifyMessage({
  address,
  message,
  signature,
}: {
  address: Address
  message: string
  signature: Signature
}) {
  const result = await authClient.siws.verify({
    message,
    signature,
    walletAddress: address,
  })

  if (!result.data) {
    throw new Error(result.error?.message || 'Failed to verify signature')
  }

  return result.data
}

import {
  type Address,
  assertIsSignature,
  getBase58Decoder,
  type Signature,
} from '@solana/kit'
import type { SolanaSignInInput, SolanaSignInOutput } from '@wallet-ui/react'
import {
  createSIWSInput,
  type SIWSNonceResponse,
} from 'better-auth-solana/client'
import { authClient } from '@/lib/auth-client'

export async function handleSiwsAuth({
  address,
  cluster,
  refresh,
  signIn,
  statement,
}: {
  address: Address
  cluster: string
  refresh: () => Promise<void>
  signIn: (input: SolanaSignInInput) => Promise<SolanaSignInOutput>
  statement: string
}) {
  const nonce = await fetchNonce({ address, cluster })
  const { message, signature } = await createAndSignMessage({
    address,
    nonce,
    signIn,
    statement,
  })
  const verifyData = await verifyMessage({
    address,
    cluster,
    message,
    signature,
  })

  await refresh()

  return verifyData
}

async function fetchNonce({
  address,
  cluster,
}: {
  address: Address
  cluster: string
}): Promise<SIWSNonceResponse> {
  const { data, error } = await authClient.siws.nonce({
    cluster,
    walletAddress: address,
  })

  if (!data) {
    throw new Error(error?.message || 'Failed to fetch nonce')
  }

  return data
}

async function createAndSignMessage({
  address,
  nonce,
  signIn,
  statement,
}: {
  address: Address
  nonce: SIWSNonceResponse
  signIn: (input: SolanaSignInInput) => Promise<SolanaSignInOutput>
  statement: string
}): Promise<{ message: string; signature: Signature }> {
  const input = createSignInInput({ address, nonce, statement })
  const { signedMessage, signature } = await signIn(input)

  return {
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
  nonce,
  statement,
}: {
  address: Address
  nonce: SIWSNonceResponse
  statement: string
}): SolanaSignInInput {
  return createSIWSInput({
    address,
    challenge: nonce,
    statement,
  })
}

async function verifyMessage({
  address,
  cluster,
  message,
  signature,
}: {
  address: Address
  cluster: string
  message: string
  signature: Signature
}) {
  const { data, error } = await authClient.siws.verify({
    cluster,
    message,
    signature,
    walletAddress: address,
  })

  if (!data) {
    throw new Error(error?.message || 'Failed to verify signature')
  }

  return data
}

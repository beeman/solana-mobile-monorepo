import { createFileRoute } from '@tanstack/react-router'
import { SolanaFeatureEntry } from '@/features/solana/feature/solana-feature-entry'

export const Route = createFileRoute('/solana')({
  component: SolanaFeatureEntry,
})

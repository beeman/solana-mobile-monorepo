import { createFileRoute } from '@tanstack/react-router'
import { AiFeatureEntry } from '@/features/ai/feature/ai-feature-entry'

export const Route = createFileRoute('/ai')({
  component: AiFeatureEntry,
})

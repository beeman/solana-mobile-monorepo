import { createFileRoute } from '@tanstack/react-router'

import { HomeFeatureIndex } from '@/features/home/feature/home-feature-index'

export const Route = createFileRoute('/')({
  component: HomeFeatureIndex,
})

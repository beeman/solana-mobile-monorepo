import type { ReactNode } from 'react'

import { AuthFeatureUserMenu } from '@/features/auth/feature/auth-feature-user-menu'
import { SolanaFeatureClusterSelect } from '@/features/solana/feature/solana-feature-cluster-select'
import { SolanaFeatureWalletSelect } from '@/features/solana/feature/solana-feature-wallet-select'

import { ShellUiHeader } from '../ui/shell-ui-header'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Todos', to: '/todos' },
  { label: 'AI Chat', to: '/ai' },
  { label: 'Solana', to: '/solana' },
] as const

export function ShellFeatureRoot({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-svh grid-rows-[auto_1fr]">
      <ShellUiHeader
        actions={
          <>
            <SolanaFeatureClusterSelect />
            <SolanaFeatureWalletSelect />
            <AuthFeatureUserMenu />
          </>
        }
        links={links}
      />
      {children}
    </div>
  )
}

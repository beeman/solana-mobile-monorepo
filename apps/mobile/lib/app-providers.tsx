import { QueryClientProvider } from '@tanstack/react-query'
import {
  createSolanaDevnet,
  MobileWalletProvider,
} from '@wallet-ui/react-native-kit'
import { HeroUINativeProvider } from 'heroui-native'
import type { ReactNode } from 'react'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { ShellThemeProvider } from '@/features/shell/data-access/shell-theme-provider'
import { ShellUiThemedStatusBar } from '@/features/shell/ui/shell-ui-themed-status-bar'
import { queryClient } from '@/lib/orpc'

const cluster = createSolanaDevnet()
const identity = {
  name: 'Solana Mobile Monorepo',
  uri: 'https://solana.com',
  icon: 'favicon.png',
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MobileWalletProvider cluster={cluster} identity={identity}>
        <KeyboardProvider>
          <ShellThemeProvider>
            <HeroUINativeProvider
              config={{
                devInfo: {
                  stylingPrinciples: false,
                },
              }}
            >
              <ShellUiThemedStatusBar />
              {children}
            </HeroUINativeProvider>
          </ShellThemeProvider>
        </KeyboardProvider>
      </MobileWalletProvider>
    </QueryClientProvider>
  )
}

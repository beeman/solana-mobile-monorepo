import type { ExplorerPath } from '@wallet-ui/react'
import { ArrowUpRightFromSquare } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { useSolanaExplorer } from '@/features/solana/data-access/use-solana-explorer'
import { cn } from '@/lib/utils'

export interface SolanaUiExplorerLinkProps extends ComponentProps<'a'> {
  children?: ReactNode
  label?: ReactNode
  path: ExplorerPath
}

export function SolanaUiExplorerLink({
  children,
  className,
  label,
  path,
  ...props
}: SolanaUiExplorerLinkProps) {
  const getExplorerUrl = useSolanaExplorer()

  return (
    <a
      className={cn('inline-flex items-center gap-1 font-mono', className)}
      href={getExplorerUrl(path)}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {label ?? children}
      <ArrowUpRightFromSquare size={12} />
    </a>
  )
}

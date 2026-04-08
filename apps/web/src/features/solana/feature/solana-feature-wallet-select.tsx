import {
  ellipsify,
  type UiWallet,
  useWalletUi,
  useWalletUiWallet,
} from '@wallet-ui/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

function WalletAvatar({
  className,
  wallet,
}: {
  className?: string
  wallet: UiWallet
}) {
  return (
    <Avatar className={cn('h-4 w-4', className)}>
      <AvatarImage
        alt={wallet.name}
        className="rounded-none"
        src={wallet.icon}
      />
      <AvatarFallback>{wallet.name[0]}</AvatarFallback>
    </Avatar>
  )
}

function SolanaFeatureWalletSelectItem({ wallet }: { wallet: UiWallet }) {
  const { connect } = useWalletUiWallet({ wallet })

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      key={wallet.name}
      onClick={() => connect()}
    >
      {wallet.icon ? <WalletAvatar wallet={wallet} /> : null}
      {wallet.name}
    </DropdownMenuItem>
  )
}

export function SolanaFeatureWalletSelect() {
  const { account, connected, copy, disconnect, wallet, wallets } =
    useWalletUi()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            {wallet?.icon ? <WalletAvatar wallet={wallet} /> : null}
            {connected
              ? account
                ? ellipsify(account.address)
                : wallet?.name
              : 'Select Wallet'}
          </Button>
        }
      />
      <DropdownMenuContent>
        {account ? (
          <>
            <DropdownMenuItem className="cursor-pointer" onClick={copy}>
              Copy address
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={disconnect}>
              Disconnect
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : null}
        {wallets.length ? (
          wallets.map((walletOption) => (
            <SolanaFeatureWalletSelectItem
              key={walletOption.name}
              wallet={walletOption}
            />
          ))
        ) : (
          <DropdownMenuItem className="cursor-pointer">
            <a
              href="https://solana.com/solana-wallets"
              rel="noopener noreferrer"
              target="_blank"
            >
              Get a Solana wallet to connect.
            </a>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

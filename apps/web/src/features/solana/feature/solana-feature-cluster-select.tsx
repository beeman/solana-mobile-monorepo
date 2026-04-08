import {
  type SolanaClusterId,
  useWalletUi,
  useWalletUiCluster,
} from '@wallet-ui/react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function SolanaFeatureClusterSelect() {
  const { cluster } = useWalletUi()
  const { clusters, setCluster } = useWalletUiCluster()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">{cluster.label}</Button>}
      />
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          onValueChange={(nextCluster) =>
            setCluster(nextCluster as SolanaClusterId)
          }
          value={cluster.id}
        >
          {clusters.map((nextCluster) => (
            <DropdownMenuRadioItem key={nextCluster.id} value={nextCluster.id}>
              {nextCluster.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { Link, useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

import { useAuthSession } from '../data-access/use-auth-session'
import { useAuthSignOut } from '../data-access/use-auth-sign-out'

export function AuthFeatureUserMenu() {
  const navigate = useNavigate()
  const { data: session, isPending: isSessionPending } = useAuthSession()
  const { isPending: isSignOutPending, signOut } = useAuthSignOut()

  if (isSessionPending) {
    return <Skeleton className="h-8 w-24" />
  }

  if (!session) {
    return (
      <Link to="/login">
        <Button variant="outline">Sign In</Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        {session.user.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
          <DropdownMenuItem
            disabled={isSignOutPending}
            onClick={() => {
              void signOut().then(() =>
                navigate({
                  to: '/',
                }),
              )
            }}
            variant="destructive"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

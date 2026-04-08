import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function AuthUiConnectionStatus({
  isConnected,
  isLoading,
}: {
  isConnected: boolean
  isLoading: boolean
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base">ORPC Backend</CardTitle>
          <CardDescription>
            {isLoading
              ? 'Checking connection...'
              : isConnected
                ? 'Connected to API'
                : 'API disconnected'}
          </CardDescription>
        </div>
        {isLoading ? (
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        ) : isConnected ? (
          <CheckCircle2 className="size-5 text-green-500" />
        ) : (
          <XCircle className="size-5 text-destructive" />
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 text-sm">
          <span
            className={`size-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-muted-foreground'}`}
          />
          <span className="text-muted-foreground">
            {isLoading
              ? 'Checking connection...'
              : isConnected
                ? 'Connected'
                : 'Disconnected'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

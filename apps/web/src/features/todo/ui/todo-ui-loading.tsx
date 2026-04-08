import { Loader2 } from 'lucide-react'

export function TodoUiLoading({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground">
      <Loader2 className="size-6 animate-spin" />
      {message ? <p className="text-sm">{message}</p> : null}
    </div>
  )
}

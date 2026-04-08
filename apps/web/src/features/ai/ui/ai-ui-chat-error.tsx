import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function AiUiChatError({ message }: { message: string }) {
  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <Alert>
        <AlertTitle>Chat Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}

import { Send } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AiUiChatComposer({
  onSendMessage,
}: {
  onSendMessage: (text: string) => void
}) {
  const [input, setInput] = useState('')

  function handleSend() {
    const text = input.trim()

    if (!text) {
      return
    }

    onSendMessage(text)
    setInput('')
  }

  return (
    <form
      className="flex w-full items-center space-x-2 border-t pt-2"
      onSubmit={(event) => {
        event.preventDefault()
        handleSend()
      }}
    >
      <Input
        autoComplete="off"
        autoFocus
        className="flex-1"
        name="prompt"
        onChange={(event) => setInput(event.target.value)}
        placeholder="Type your message..."
        value={input}
      />
      <Button disabled={!input.trim()} size="icon" type="submit">
        <Send size={18} />
      </Button>
    </form>
  )
}

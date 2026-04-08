import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function TodoUiCreateForm({
  isPending,
  onCreate,
}: {
  isPending: boolean
  onCreate: (text: string) => Promise<void>
}) {
  const [text, setText] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextText = text.trim()

    if (!nextText) {
      return
    }

    await onCreate(nextText)
    setText('')
  }

  return (
    <form className="mb-6 flex items-center space-x-2" onSubmit={handleSubmit}>
      <Input
        disabled={isPending}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a new task..."
        value={text}
      />
      <Button disabled={isPending || !text.trim()} type="submit">
        {isPending ? 'Adding...' : 'Add'}
      </Button>
    </form>
  )
}

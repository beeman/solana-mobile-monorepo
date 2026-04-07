import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { fetch as expoFetch } from 'expo/fetch'

import { apiUrl } from '@/lib/api-url'

type ApiUrlOptions = {
  relativePath: string
}

const generateAPIUrl = ({ relativePath }: ApiUrlOptions) => {
  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`

  return apiUrl.concat(path)
}

export function useAiChat() {
  return useChat({
    onError: (error) => console.error(error, 'AI Chat Error'),
    transport: new DefaultChatTransport({
      api: generateAPIUrl({ relativePath: '/ai' }),
      fetch: expoFetch as unknown as typeof globalThis.fetch,
    }),
  })
}

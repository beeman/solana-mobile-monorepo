import { useChat } from '@ai-sdk/react'
import { Ionicons } from '@expo/vector-icons'
import { DefaultChatTransport } from 'ai'
import { fetch as expoFetch } from 'expo/fetch'
import {
  Button,
  FieldError,
  Input,
  Separator,
  Surface,
  TextField,
  useThemeColor,
} from 'heroui-native'
import { useEffect, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'

import { Container } from '@/components/container'
import { serverUrl } from '@/lib/server-url'

const generateAPIUrl = (relativePath: string) => {
  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  return serverUrl.concat(path)
}

export default function AIScreen() {
  const [input, setInput] = useState('')
  const { messages, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/ai'),
    }),
    onError: (error) => console.error(error, 'AI Chat Error'),
  })
  const scrollViewRef = useRef<ScrollView>(null)
  const foregroundColor = useThemeColor('foreground')
  const mutedColor = useThemeColor('muted')

  useEffect(() => {
    const messagesCount = messages.length
    if (messagesCount === 0) return
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages.length])

  const onSubmit = () => {
    const value = input.trim()
    if (value) {
      sendMessage({ text: value })
      setInput('')
    }
  }

  if (error) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center px-4">
          <Surface variant="secondary" className="rounded-lg p-4">
            <FieldError isInvalid className="mb-2">
              {error.message}
            </FieldError>
            <Text className="text-center text-muted text-xs">
              Please check your connection and try again.
            </Text>
          </Surface>
        </View>
      </Container>
    )
  }

  return (
    <Container>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 px-4 py-4">
          <View className="mb-4 py-4">
            <Text className="font-semibold text-2xl text-foreground tracking-tight">
              AI Chat
            </Text>
            <Text className="mt-1 text-muted text-sm">
              Chat with our AI assistant
            </Text>
          </View>

          <ScrollView
            ref={scrollViewRef}
            className="mb-4 flex-1"
            showsVerticalScrollIndicator={false}
          >
            {messages.length === 0 ? (
              <View className="flex-1 items-center justify-center py-10">
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={32}
                  color={mutedColor}
                />
                <Text className="mt-3 text-muted text-sm">
                  Ask me anything to get started
                </Text>
              </View>
            ) : (
              <View className="gap-2">
                {messages.map((message) => (
                  <Surface
                    key={message.id}
                    variant={message.role === 'user' ? 'tertiary' : 'secondary'}
                    className={`rounded-lg p-3 ${message.role === 'user' ? 'ml-10' : 'mr-10'}`}
                  >
                    <Text className="mb-1 font-medium text-muted text-xs">
                      {message.role === 'user' ? 'You' : 'AI'}
                    </Text>
                    <View className="gap-1">
                      {message.parts.map((part, i) =>
                        part.type === 'text' ? (
                          <Text
                            key={`${message.id}-${i}`}
                            className="text-foreground text-sm leading-relaxed"
                          >
                            {part.text}
                          </Text>
                        ) : (
                          <Text
                            key={`${message.id}-${i}`}
                            className="text-foreground text-sm leading-relaxed"
                          >
                            {JSON.stringify(part)}
                          </Text>
                        ),
                      )}
                    </View>
                  </Surface>
                ))}
              </View>
            )}
          </ScrollView>

          <Separator className="mb-3" />

          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <TextField>
                <Input
                  value={input}
                  onChangeText={setInput}
                  placeholder="Type a message..."
                  onSubmitEditing={onSubmit}
                  autoFocus
                />
              </TextField>
            </View>
            <Button
              isIconOnly
              variant={input.trim() ? 'primary' : 'secondary'}
              onPress={onSubmit}
              isDisabled={!input.trim()}
              size="sm"
            >
              <Ionicons
                name="arrow-up"
                size={18}
                color={input.trim() ? foregroundColor : mutedColor}
              />
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  )
}

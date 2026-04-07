import { Surface } from 'heroui-native'
import { Text, View } from 'react-native'

type MessagePart = {
  text?: string
  type: string
}

type Message = {
  id: string
  parts: MessagePart[]
  role: string
}

type AiUiChatMessageItemProps = {
  message: Message
}

export function AiUiChatMessageItem({ message }: AiUiChatMessageItemProps) {
  return (
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
              {part.text ?? ''}
            </Text>
          ) : part.type === 'step-start' ? (
            <View
              key={`${message.id}-${i}`}
              className="border-b border-b-accent-soft"
            />
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
  )
}

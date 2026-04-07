import { Ionicons } from '@expo/vector-icons'
import { Button, Input, TextField, useThemeColor } from 'heroui-native'
import { useState } from 'react'
import { View } from 'react-native'

type AiUiChatComposerProps = {
  onSendMessage: (text: string) => void
}

export function AiUiChatComposer({ onSendMessage }: AiUiChatComposerProps) {
  const [input, setInput] = useState('')
  const foregroundColor = useThemeColor('foreground')
  const mutedColor = useThemeColor('muted')

  const handleSend = () => {
    const value = input.trim()
    if (!value) return

    onSendMessage(value)
    setInput('')
  }

  return (
    <View className="flex-row items-center gap-2">
      <View className="flex-1">
        <TextField>
          <Input
            autoFocus
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            placeholder="Type a message..."
            value={input}
          />
        </TextField>
      </View>
      <Button
        isDisabled={!input.trim()}
        isIconOnly
        onPress={handleSend}
        size="sm"
        variant={input.trim() ? 'primary' : 'secondary'}
      >
        <Ionicons
          name="arrow-up"
          size={18}
          color={input.trim() ? foregroundColor : mutedColor}
        />
      </Button>
    </View>
  )
}

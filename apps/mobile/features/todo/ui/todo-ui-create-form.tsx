import { Ionicons } from '@expo/vector-icons'
import {
  Button,
  Input,
  Spinner,
  Surface,
  TextField,
  useThemeColor,
} from 'heroui-native'
import { useState } from 'react'
import { View } from 'react-native'

type TodoUiCreateFormProps = {
  isPending: boolean
  onCreate: (text: string, onSuccess: () => void) => void
}

export function TodoUiCreateForm({
  isPending,
  onCreate,
}: TodoUiCreateFormProps) {
  const [newTodoText, setNewTodoText] = useState('')
  const foregroundColor = useThemeColor('foreground')
  const mutedColor = useThemeColor('muted')

  const handleCreateTodo = () => {
    const text = newTodoText.trim()
    if (!text || isPending) return

    onCreate(text, () => {
      setNewTodoText('')
    })
  }

  return (
    <Surface variant="default" className="mb-4 rounded-lg p-3">
      <View className="flex-row items-center gap-2">
        <View className="flex-1">
          <TextField>
            <Input
              value={newTodoText}
              onChangeText={setNewTodoText}
              placeholder="Add a new task..."
              editable={!isPending}
              onSubmitEditing={handleCreateTodo}
              returnKeyType="done"
            />
          </TextField>
        </View>
        <Button
          isIconOnly
          variant={isPending || !newTodoText.trim() ? 'primary' : 'primary'}
          isDisabled={isPending || !newTodoText.trim()}
          onPress={handleCreateTodo}
          size="sm"
        >
          {isPending ? (
            <Spinner size="sm" color="default" />
          ) : (
            <Ionicons
              name="add"
              size={20}
              color={
                isPending || !newTodoText.trim() ? mutedColor : foregroundColor
              }
            />
          )}
        </Button>
      </View>
    </Surface>
  )
}

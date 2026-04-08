import { Ionicons } from '@expo/vector-icons'
import { Button, Checkbox, Surface, useThemeColor } from 'heroui-native'
import { Alert, Text, View } from 'react-native'

type Todo = {
  completed: boolean
  id: number
  text: string
}

type TodoUiListItemProps = {
  onDeleteTodo: (id: number) => void
  onToggleTodo: (id: number, completed: boolean) => void
  todo: Todo
}

export function TodoUiListItem({
  onDeleteTodo,
  onToggleTodo,
  todo,
}: TodoUiListItemProps) {
  const dangerColor = useThemeColor('danger')

  const handleDeleteTodo = () => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDeleteTodo(todo.id),
      },
    ])
  }

  return (
    <Surface key={todo.id} variant="default" className="rounded-lg p-3">
      <View className="flex-row items-center gap-3">
        <Checkbox
          isSelected={todo.completed}
          onSelectedChange={() => onToggleTodo(todo.id, todo.completed)}
        />
        <View className="flex-1">
          <Text
            className={`text-sm ${todo.completed ? 'text-muted line-through' : 'text-foreground'}`}
          >
            {todo.text}
          </Text>
        </View>
        <Button isIconOnly variant="ghost" onPress={handleDeleteTodo} size="sm">
          <Ionicons name="trash-outline" size={16} color={dangerColor} />
        </Button>
      </View>
    </Surface>
  )
}

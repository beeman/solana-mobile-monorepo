import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import {
  Button,
  Checkbox,
  Chip,
  Input,
  Spinner,
  Surface,
  TextField,
  useThemeColor,
} from 'heroui-native'
import { useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'

import { Container } from '@/components/container'
import { orpc } from '@/utils/orpc'

function useTodoGetAll({ enabled }: { enabled: boolean }) {
  return useQuery({
    ...orpc.todo.getAll.queryOptions(),
    enabled,
  })
}

function useInvalidateTodos() {
  const queryClient = useQueryClient()

  return function invalidateTodos() {
    return queryClient.invalidateQueries({
      queryKey: orpc.todo.getAll.queryOptions().queryKey,
    })
  }
}

function useTodoCreate({ onSuccess }: { onSuccess?: () => void }) {
  const invalidateTodos = useInvalidateTodos()

  return useMutation(
    orpc.todo.create.mutationOptions({
      onSuccess: () => {
        void invalidateTodos()
        onSuccess?.()
      },
    }),
  )
}

function useTodoUpdate() {
  const invalidateTodos = useInvalidateTodos()

  return useMutation(
    orpc.todo.toggle.mutationOptions({
      onSuccess: () => {
        void invalidateTodos()
      },
    }),
  )
}

function useTodoDelete() {
  const invalidateTodos = useInvalidateTodos()

  return useMutation(
    orpc.todo.delete.mutationOptions({
      onSuccess: () => {
        void invalidateTodos()
      },
    }),
  )
}

export default function TodosScreen() {
  const [newTodoText, setNewTodoText] = useState('')
  const router = useRouter()
  const meQuery = useQuery(orpc.me.queryOptions())
  const todos = useTodoGetAll({
    enabled: Boolean(meQuery.data),
  })
  const createMutation = useTodoCreate({
    onSuccess: () => {
      setNewTodoText('')
    },
  })
  const toggleMutation = useTodoUpdate()
  const deleteMutation = useTodoDelete()

  const mutedColor = useThemeColor('muted')
  const dangerColor = useThemeColor('danger')
  const foregroundColor = useThemeColor('foreground')

  if (meQuery.isLoading) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center p-4">
          <Spinner size="lg" />
          <Text className="mt-3 text-muted text-sm">Checking session...</Text>
        </View>
      </Container>
    )
  }

  if (!meQuery.data) {
    return (
      <Container>
        <View className="flex-1 justify-center p-4">
          <Surface
            variant="secondary"
            className="items-center rounded-lg px-5 py-8"
          >
            <Ionicons name="lock-closed-outline" size={36} color={mutedColor} />
            <Text className="mt-4 text-center font-semibold text-foreground text-xl">
              Sign in to view your todos
            </Text>
            <Text className="mt-2 text-center text-muted text-sm">
              Your todo list is tied to your account. Log in from the Home
              screen to create and manage tasks.
            </Text>
            <Button className="mt-5" onPress={() => router.push('/')}>
              Go to Home
            </Button>
          </Surface>
        </View>
      </Container>
    )
  }

  function handleAddTodo() {
    if (newTodoText.trim()) {
      createMutation.mutate({ text: newTodoText })
    }
  }

  function handleToggleTodo(id: number, completed: boolean) {
    toggleMutation.mutate({ id, completed: !completed })
  }

  function handleDeleteTodo(id: number) {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate({ id }),
      },
    ])
  }

  const isLoading = todos?.isLoading
  const completedCount = todos?.data?.filter((t) => t.completed).length || 0
  const totalCount = todos?.data?.length || 0

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <View className="mb-4 py-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-2xl text-foreground tracking-tight">
              Tasks
            </Text>
            {totalCount > 0 && (
              <Chip variant="secondary" color="accent" size="sm">
                <Chip.Label>
                  {completedCount}/{totalCount}
                </Chip.Label>
              </Chip>
            )}
          </View>
        </View>

        <Surface variant="secondary" className="mb-4 rounded-lg p-3">
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <TextField>
                <Input
                  value={newTodoText}
                  onChangeText={setNewTodoText}
                  placeholder="Add a new task..."
                  editable={!createMutation.isPending}
                  onSubmitEditing={handleAddTodo}
                  returnKeyType="done"
                />
              </TextField>
            </View>
            <Button
              isIconOnly
              variant={
                createMutation.isPending || !newTodoText.trim()
                  ? 'secondary'
                  : 'primary'
              }
              isDisabled={createMutation.isPending || !newTodoText.trim()}
              onPress={handleAddTodo}
              size="sm"
            >
              {createMutation.isPending ? (
                <Spinner size="sm" color="default" />
              ) : (
                <Ionicons
                  name="add"
                  size={20}
                  color={
                    createMutation.isPending || !newTodoText.trim()
                      ? mutedColor
                      : foregroundColor
                  }
                />
              )}
            </Button>
          </View>
        </Surface>

        {isLoading && (
          <View className="items-center justify-center py-12">
            <Spinner size="lg" />
            <Text className="mt-3 text-muted text-sm">Loading tasks...</Text>
          </View>
        )}

        {todos?.data && todos.data.length === 0 && !isLoading && (
          <Surface
            variant="secondary"
            className="items-center justify-center rounded-lg py-10"
          >
            <Ionicons name="checkbox-outline" size={40} color={mutedColor} />
            <Text className="mt-3 font-medium text-foreground">
              No tasks yet
            </Text>
            <Text className="mt-1 text-muted text-xs">
              Add your first task to get started
            </Text>
          </Surface>
        )}

        {todos?.data && todos.data.length > 0 && (
          <View className="gap-2">
            {todos.data.map((todo) => (
              <Surface
                key={todo.id}
                variant="secondary"
                className="rounded-lg p-3"
              >
                <View className="flex-row items-center gap-3">
                  <Checkbox
                    isSelected={todo.completed}
                    onSelectedChange={() =>
                      handleToggleTodo(todo.id, todo.completed)
                    }
                  />
                  <View className="flex-1">
                    <Text
                      className={`text-sm ${todo.completed ? 'text-muted line-through' : 'text-foreground'}`}
                    >
                      {todo.text}
                    </Text>
                  </View>
                  <Button
                    isIconOnly
                    variant="ghost"
                    onPress={() => handleDeleteTodo(todo.id)}
                    size="sm"
                  >
                    <Ionicons
                      name="trash-outline"
                      size={16}
                      color={dangerColor}
                    />
                  </Button>
                </View>
              </Surface>
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  )
}

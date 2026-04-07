import { cn } from 'heroui-native'
import type { PropsWithChildren } from 'react'
import { ScrollView, type ScrollViewProps } from 'react-native'

export function ShellUiScrollView({
  children,
  className,
  ...props
}: PropsWithChildren<ScrollViewProps>) {
  return (
    <ScrollView
      className={cn('flex-1 bg-background', className)}
      contentContainerStyle={{ flexGrow: 1 }}
      {...props}
    >
      {children}
    </ScrollView>
  )
}

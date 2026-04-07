import { cn } from 'heroui-native'
import type { PropsWithChildren } from 'react'
import { View, type ViewProps } from 'react-native'
import Animated, { type AnimatedProps } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ShellUiScrollView } from '@/features/shell/ui/shell-ui-scroll-view'

const AnimatedView = Animated.createAnimatedComponent(View)

type Props = AnimatedProps<ViewProps> & {
  className?: string
}

export function ShellUiContainer({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets()

  return (
    <AnimatedView
      className={cn('flex-1 bg-background', className)}
      style={{
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
      {...props}
    >
      <ShellUiScrollView>{children}</ShellUiScrollView>
    </AnimatedView>
  )
}

import type React from 'react'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { Uniwind, useUniwind } from 'uniwind'

type ThemeName = 'light' | 'dark'

type AppShellThemeContextType = {
  currentTheme: string
  isLight: boolean
  isDark: boolean
  setTheme: (theme: ThemeName) => void
  toggleTheme: () => void
}

const AppShellThemeContext = createContext<
  AppShellThemeContextType | undefined
>(undefined)

export function ShellThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useUniwind()

  const isLight = useMemo(() => theme === 'light', [theme])

  const isDark = useMemo(() => theme === 'dark', [theme])

  const setTheme = useCallback((newTheme: ThemeName) => {
    Uniwind.setTheme(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    Uniwind.setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme])

  const value = useMemo(
    () => ({
      currentTheme: theme,
      isLight,
      isDark,
      setTheme,
      toggleTheme,
    }),
    [theme, isLight, isDark, setTheme, toggleTheme],
  )

  return (
    <AppShellThemeContext.Provider value={value}>
      {children}
    </AppShellThemeContext.Provider>
  )
}

export function useAppTheme() {
  const context = useContext(AppShellThemeContext)
  if (!context) {
    throw new Error('useAppTheme must be used within AppShellThemeProvider')
  }
  return context
}

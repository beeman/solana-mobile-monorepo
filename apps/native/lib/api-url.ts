import { env } from '@solana-mobile-monorepo/env/native'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

const ANDROID_EMULATOR_HOST = '10.0.2.2'
const DEFAULT_API_PORT = '3000'
const LOCALHOST_HOSTS = new Set(['127.0.0.1', '::1', 'localhost'])
const CONFIGURED_SOURCE = 'configured'
const DERIVED_SOURCE = 'derived'
const API_URL_LOGGED_FLAG = '__native_api_url_logged__'

type ApiUrlSource = typeof CONFIGURED_SOURCE | typeof DERIVED_SOURCE

function getExpoDevelopmentHost() {
  const hostUri = Constants.expoConfig?.hostUri?.trim()
  if (!hostUri) {
    return null
  }

  const normalizedHostUri = hostUri.includes('://')
    ? hostUri
    : `http://${hostUri}`

  try {
    return new URL(normalizedHostUri).hostname
  } catch {
    const host = hostUri.split('/')[0]?.split(':')[0]
    return host || null
  }
}

function normalizeDevelopmentHost(host: string) {
  if (Platform.OS === 'android' && LOCALHOST_HOSTS.has(host)) {
    return ANDROID_EMULATOR_HOST
  }

  return host
}

export function getApiUrl() {
  const explicitApiUrl = env.EXPO_PUBLIC_API_URL?.trim()
  if (explicitApiUrl) {
    return {
      source: CONFIGURED_SOURCE satisfies ApiUrlSource,
      value: explicitApiUrl,
    }
  }

  if (__DEV__) {
    const expoDevelopmentHost = getExpoDevelopmentHost()
    if (expoDevelopmentHost) {
      const host = normalizeDevelopmentHost(expoDevelopmentHost)
      return {
        source: DERIVED_SOURCE satisfies ApiUrlSource,
        value: `http://${host}:${DEFAULT_API_PORT}`,
      }
    }
  }

  throw new Error(
    'EXPO_PUBLIC_API_URL is not configured. Set it in apps/native/.env or run the app through Expo so the development host can be derived automatically.',
  )
}

export const nativeApiUrl = getApiUrl()
export const apiUrl = nativeApiUrl.value
export const apiUrlSource = nativeApiUrl.source

export function debugApiUrl() {
  const globalScope = globalThis as typeof globalThis &
    Record<string, boolean | undefined>

  if (globalScope[API_URL_LOGGED_FLAG]) {
    return
  }

  globalScope[API_URL_LOGGED_FLAG] = true

  const sourceLabel =
    apiUrlSource === CONFIGURED_SOURCE
      ? 'apps/native/.env EXPO_PUBLIC_API_URL'
      : 'Expo development host'

  console.info(
    ['API URL', `- value: ${apiUrl}`, `- source: ${sourceLabel}`].join('\n'),
  )
}

import { env } from '@solana-mobile-monorepo/env/native'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

const ANDROID_EMULATOR_HOST = '10.0.2.2'
const DEFAULT_SERVER_PORT = '3000'
const LOCALHOST_HOSTS = new Set(['127.0.0.1', '::1', 'localhost'])
const CONFIGURED_SOURCE = 'configured'
const DERIVED_SOURCE = 'derived'
const SERVER_URL_LOGGED_FLAG =
  '__solana_mobile_monorepo_native_server_url_logged__'

type ServerUrlSource = typeof CONFIGURED_SOURCE | typeof DERIVED_SOURCE

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

export function getServerUrl() {
  const explicitServerUrl = env.EXPO_PUBLIC_SERVER_URL?.trim()
  if (explicitServerUrl) {
    return {
      source: CONFIGURED_SOURCE satisfies ServerUrlSource,
      value: explicitServerUrl,
    }
  }

  if (__DEV__) {
    const expoDevelopmentHost = getExpoDevelopmentHost()
    if (expoDevelopmentHost) {
      const host = normalizeDevelopmentHost(expoDevelopmentHost)
      return {
        source: DERIVED_SOURCE satisfies ServerUrlSource,
        value: `http://${host}:${DEFAULT_SERVER_PORT}`,
      }
    }
  }

  throw new Error(
    'EXPO_PUBLIC_SERVER_URL is not configured. Set it in apps/native/.env or run the app through Expo so the development host can be derived automatically.',
  )
}

export const nativeServerUrl = getServerUrl()
export const serverUrl = nativeServerUrl.value
export const serverUrlSource = nativeServerUrl.source

export function debugServerUrl() {
  const globalScope = globalThis as typeof globalThis &
    Record<string, boolean | undefined>

  if (globalScope[SERVER_URL_LOGGED_FLAG]) {
    return
  }

  globalScope[SERVER_URL_LOGGED_FLAG] = true

  const sourceLabel =
    serverUrlSource === CONFIGURED_SOURCE
      ? 'apps/native/.env EXPO_PUBLIC_SERVER_URL'
      : 'Expo development host'

  console.info(
    [
      'Native server URL',
      `- value: ${serverUrl}`,
      `- source: ${sourceLabel}`,
    ].join('\n'),
  )
}

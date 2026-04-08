import { redirect } from '@tanstack/react-router'

import { getUser } from './get-user'

export type RequireAuthContext = {
  session: Awaited<ReturnType<typeof getUser>> | null
}

export async function requireAuthBeforeLoad() {
  try {
    const session = await getUser()

    return { session }
  } catch (error) {
    console.error('[auth] beforeLoad error:', error)
    throw error
  }
}

export function requireAuthLoader({
  context,
}: {
  context: RequireAuthContext
}) {
  if (!context.session) {
    throw redirect({
      to: '/login',
    })
  }
}

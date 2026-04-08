import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export function ShellUiHeader({
  actions,
  links,
}: {
  actions: ReactNode
  links: ReadonlyArray<{ label: string; to: string }>
}) {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links.map(({ label, to }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      <hr />
    </div>
  )
}

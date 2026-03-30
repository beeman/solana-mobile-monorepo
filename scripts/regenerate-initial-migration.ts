import { readdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DEFAULT_MIGRATION_NAME = 'initial_schema'
const ROOT_DIR = join(import.meta.dir, '..')
const DB_DIR = join(ROOT_DIR, 'packages', 'db')
const MIGRATIONS_DIR = join(DB_DIR, 'src', 'migrations')
const META_DIR = join(MIGRATIONS_DIR, 'meta')
const JOURNAL_PATH = join(META_DIR, '_journal.json')

type Journal = {
  dialect: string
  entries: unknown[]
  version: string
}

type ExitCodeError = Error & {
  exitCode: number
}

function isJournal(value: unknown): value is Journal {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Partial<Record<keyof Journal, unknown>>

  return (
    typeof candidate.dialect === 'string' &&
    Array.isArray(candidate.entries) &&
    typeof candidate.version === 'string'
  )
}

function isExitCodeError(error: unknown): error is ExitCodeError {
  return (
    error instanceof Error &&
    'exitCode' in error &&
    typeof error.exitCode === 'number'
  )
}

function printHelp() {
  console.log('Usage: bun scripts/regenerate-initial-migration.ts [name]')
  console.log()
  console.log(
    'Removes generated Drizzle migration artifacts and regenerates a single clean baseline migration.',
  )
  console.log()
  console.log('Examples:')
  console.log('  bun scripts/regenerate-initial-migration.ts')
  console.log('  bun scripts/regenerate-initial-migration.ts initial_schema')
}

function getMigrationName(): string {
  const arg = process.argv[2]

  if (!arg) {
    return DEFAULT_MIGRATION_NAME
  }

  if (arg === '--help' || arg === '-h') {
    printHelp()
    process.exit(0)
  }

  return arg
}

async function readJournal(): Promise<Journal> {
  const journal: unknown = await Bun.file(JOURNAL_PATH).json()

  if (!isJournal(journal)) {
    throw new Error('Invalid journal file format.')
  }

  return journal
}

async function removeGeneratedArtifacts() {
  const migrationEntries = (
    await readdir(MIGRATIONS_DIR, {
      withFileTypes: true,
    })
  )
    .filter((entry) => entry.isFile() && entry.name.endsWith('.sql'))
    .map((entry) => entry.name)
    .sort()

  for (const entry of migrationEntries) {
    await rm(join(MIGRATIONS_DIR, entry), { force: true })
    console.log(`Removed ${join('packages/db/src/migrations', entry)}`)
  }

  const metaEntries = (await readdir(META_DIR, { withFileTypes: true }))
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name !== '_journal.json' &&
        entry.name.endsWith('.json'),
    )
    .map((entry) => entry.name)
    .sort()

  for (const entry of metaEntries) {
    await rm(join(META_DIR, entry), { force: true })
    console.log(`Removed ${join('packages/db/src/migrations/meta', entry)}`)
  }
}

async function resetJournal() {
  const journal = await readJournal()
  const nextJournal: Journal = {
    dialect: journal.dialect,
    entries: [],
    version: journal.version,
  }

  await writeFile(JOURNAL_PATH, `${JSON.stringify(nextJournal, null, 2)}\n`)
  console.log('Reset packages/db/src/migrations/meta/_journal.json')
}

async function generateBaselineMigration(name: string) {
  const subprocess = Bun.spawn(['bun', 'run', 'db:generate', '--name', name], {
    cwd: DB_DIR,
    stdio: ['inherit', 'inherit', 'inherit'],
  })

  const exitCode = await subprocess.exited

  if (exitCode !== 0) {
    throw Object.assign(
      new Error(`Migration generation failed with exit code ${exitCode}.`),
      { exitCode },
    )
  }
}

async function validateOutput() {
  const migrationEntries = (
    await readdir(MIGRATIONS_DIR, {
      withFileTypes: true,
    })
  )
    .filter((entry) => entry.isFile() && entry.name.endsWith('.sql'))
    .map((entry) => entry.name)
    .sort()

  const snapshotEntries = (await readdir(META_DIR, { withFileTypes: true }))
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name !== '_journal.json' &&
        entry.name.endsWith('.json'),
    )
    .map((entry) => entry.name)
    .sort()

  if (migrationEntries.length !== 1) {
    throw new Error(
      `Expected exactly 1 SQL migration, found ${migrationEntries.length}.`,
    )
  }

  if (snapshotEntries.length !== 1) {
    throw new Error(
      `Expected exactly 1 snapshot file, found ${snapshotEntries.length}.`,
    )
  }

  const [migrationEntry] = migrationEntries as [string]
  const [snapshotEntry] = snapshotEntries as [string]

  console.log()
  console.log('Generated baseline migration:')
  console.log(`  ${join('packages/db/src/migrations', migrationEntry)}`)
  console.log(`  ${join('packages/db/src/migrations/meta', snapshotEntry)}`)
  console.log('  packages/db/src/migrations/meta/_journal.json')
}

async function main() {
  const migrationName = getMigrationName()

  await removeGeneratedArtifacts()
  await resetJournal()
  await generateBaselineMigration(migrationName)
  await validateOutput()
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(isExitCodeError(error) ? error.exitCode : 1)
})

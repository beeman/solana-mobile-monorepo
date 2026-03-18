import { randomBytes } from 'node:crypto'
import { file, Glob, write } from 'bun'

const glob = new Glob('apps/*/.env.example')

async function replaceBetterAuthSecret(envPath: string) {
  const env = file(envPath)
  const envContents = await env.text()
  const lineEnding = envContents.includes('\r\n') ? '\r\n' : '\n'
  const lines = envContents.split(/\r?\n/)
  const secretIndex = lines.findIndex((line) =>
    line.startsWith('BETTER_AUTH_SECRET='),
  )

  if (secretIndex === -1) {
    return
  }

  lines[secretIndex] = `BETTER_AUTH_SECRET=${randomBytes(32).toString('hex')}`

  await write(env, lines.join(lineEnding))
  console.log(`Updated BETTER_AUTH_SECRET in ${envPath}`)
}

for await (const example of glob.scan('.')) {
  const envPath = example.replace('.env.example', '.env')
  const env = file(envPath)
  const shouldCopy = !(await env.exists()) || env.size === 0

  if (shouldCopy) {
    const contents = await file(example).text()
    await write(envPath, contents)
    console.log(`Copied ${example} → ${envPath}`)
    await replaceBetterAuthSecret(envPath)
  }
}

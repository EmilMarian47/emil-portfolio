import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async () => {
  const memesDir = join(process.cwd(), 'public', 'memes')

  try {
    const files = await readdir(memesDir)

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']

    return files
      .filter((file) =>
        imageExtensions.some((extension) =>
          file.toLowerCase().endsWith(extension)
        )
      )
      .sort()
      .map((file) => ({
        src: `/memes/${file}`,
        alt: file.replace(/\.[^/.]+$/, ''),
      }))
  } catch {
    return []
  }
})
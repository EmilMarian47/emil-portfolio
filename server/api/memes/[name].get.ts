export default defineEventHandler(async (event) => {
  const filename = getRouterParam(event, 'name') || ''
  const storage = useStorage('assets:server')

  try {
    // 1. Fetch raw binary image data
    const item = await storage.getItemRaw(`memes:${filename}`)
    if (!item) {
      throw createError({ statusCode: 404, statusMessage: 'Image not found' })
    }

    // 2. Map extension to browser image content types
    const ext = filename.split('.').pop()?.toLowerCase() || ''
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      avif: 'image/avif',
    }

    // 3. Set Content-Type so the browser renders it visually
    setResponseHeader(event, 'Content-Type', mimeTypes[ext] || 'application/octet-stream')
    setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

    return item
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Image not found' })
  }
})
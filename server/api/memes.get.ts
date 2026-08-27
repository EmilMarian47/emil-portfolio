export default defineEventHandler(async () => {
  try {
    const storage = useStorage('assets:server')
    // Get all asset keys in the server/assets/memes directory
    const keys = await storage.getKeys('memes')

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']

    return keys
      .filter((key) => imageExtensions.some((ext) => key.toLowerCase().endsWith(ext)))
      .sort()
      .map((key) => {
        // Extract filename from the Nitro key format ("memes:filename.jpg")
        const filename = key.split(':').pop() || ''
        
        return {
          // Serve image content via dynamic server route below
          src: `/api/memes/${filename}`,
          alt: filename.replace(/\.[^/.]+$/, ''),
        }
      })
  } catch {
    return []
  }
})
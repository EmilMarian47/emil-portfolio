export default defineEventHandler(async () => {
  try {
    // 1. Get access to Nitro's built-in asset storage layer
    const storage = useStorage('assets:server')
    
    // 2. Scan the keys in the public/memes folder (Nitro uses ':' instead of '/')
    const keys = await storage.getKeys('public:memes')

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']

    // 3. Filter, sort, and clean up the keys into accessible image metadata
    return keys
      .filter((key) =>
        imageExtensions.some((extension) =>
          key.toLowerCase().endsWith(extension)
        )
      )
      .sort()
      .map((key) => {
        // Nitro keys look like "public:memes:filename.jpg", extract just the filename
        const filename = key.split(':').pop() || ''
        
        return {
          src: `/memes/${filename}`,
          alt: filename.replace(/\.[^/.]+$/, ''),
        }
      })
  } catch {
    // Fallback if the asset directory cannot be resolved or is empty
    return []
  }
})

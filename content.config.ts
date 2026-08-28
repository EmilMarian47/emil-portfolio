import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    works: defineCollection({
      type: 'page',
      source: 'works/**/*.md',
      schema: z.object({
        title: z.string(),
        type: z.string().optional(),
        thumbnail: z.string().optional(),
        cover: z.string().optional(),
        url: z.string().optional(),
        website: z.string().optional(),
        link: z.string().optional(),
      }),
    }),
  },
});
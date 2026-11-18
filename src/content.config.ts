import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        bc_version_verified: z.string().min(1),
        last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        level: z.enum(['Basic', 'Intermediate', 'Expert']).optional(),
      }),
    }),
  }),
};

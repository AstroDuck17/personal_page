import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const common = {
  title: z.string(),
  description: z.string(),
  topics: z.array(z.enum(['machine-learning', 'systems', 'embedded', 'security', 'quantum-computing'])).min(1),
  date: z.coerce.date().optional(),
  dateLabel: z.string().optional(),
  status: z.enum(['completed', 'ongoing', 'planned', 'draft']),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  related: z.array(z.string()).default([]),
  links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  sources: z.array(z.string()).min(1)
};

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    ...common,
    type: z.enum(['project', 'research']),
    role: z.string(),
    context: z.string(),
    stack: z.array(z.string()),
    order: z.number(),
    visual: z.enum(['physics', 'graph', 'hardware', 'audio', 'network', 'kernel', 'shell', 'orbit'])
  })
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    ...common,
    type: z.enum(['article', 'note', 'research-explanation']),
    readingTime: z.string(),
    editorialNote: z.string().optional()
  })
});

export const collections = { projects, writing };

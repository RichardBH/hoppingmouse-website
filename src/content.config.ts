import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// [^_]* excludes drafts by convention; named client material must never live
// in this repo at all (see CLAUDE.md confidentiality note).
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    sector: z.enum(['agriculture', 'water', 'rail', 'manufacturing', 'mining']),
    platforms: z.array(z.string()),
    summary: z.string(),
    anonymised: z.boolean().default(false),
    order: z.number().default(99),
    reportNo: z.string(),
  }),
});

export const collections = { 'case-studies': caseStudies };

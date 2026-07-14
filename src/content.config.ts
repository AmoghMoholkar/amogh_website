import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---------------------------------------------------------------------------
// PROJECTS — one Markdown file per project in src/content/projects/
// ---------------------------------------------------------------------------
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(), // one-line card description
    date: z.coerce.date(),
    category: z.array(
      z.enum([
        'Research',
        'Engineering',
        'Programming',
        'Materials',
        'Manufacturing',
        '3D Printing',
        'Other',
      ])
    ),
    status: z.enum(['Completed', 'In Progress', 'Planned']),
    cover: z.string().optional(), // path under /public/images/...
    tools: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    github: z.string().url().optional(),
    paper: z.string().url().optional(),
    presentation: z.string().url().optional(),
    download: z.string().url().optional(),
    lessonsLearned: z.string().optional(),
    futureImprovements: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

// ---------------------------------------------------------------------------
// RESEARCH — publications, presentations, posters, reports
// ---------------------------------------------------------------------------
const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['Publication', 'Conference Presentation', 'Poster', 'Report']),
    status: z.enum(['Published', 'In Preparation', 'Submitted', 'Presented']),
    date: z.coerce.date(),
    authors: z.string(),
    venue: z.string().optional(),
    abstract: z.string(),
    pdf: z.string().optional(),
    doi: z.string().optional(),
    citation: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

// ---------------------------------------------------------------------------
// MUSIC — videos, performances, collaborations
// ---------------------------------------------------------------------------
const music = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/music' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['Video', 'Performance', 'Collaboration']),
    date: z.coerce.date(),
    youtubeId: z.string().optional(), // just the video ID, e.g. dQw4w9WgXcQ
    platform: z.string().optional(), // "YouTube", "Instagram", "Live", etc.
    duration: z.string().optional(), // "3:42"
    description: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

// ---------------------------------------------------------------------------
// BLOG — notes and articles
// ---------------------------------------------------------------------------
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum([
      'Metallurgy',
      'Materials Science',
      'Engineering',
      'Research Notes',
      'Music',
      'Learning',
      'Life',
    ]),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, research, music, blog };

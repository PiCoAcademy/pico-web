import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { author } from './schemas/author'
import { blogPost } from './schemas/blogPost'
import { caseStudy } from './schemas/caseStudy'

export default defineConfig({
  name: 'pico-studio',
  title: 'PICO CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'placeholder',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [author, blogPost, caseStudy],
  },
})

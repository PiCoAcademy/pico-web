import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'client', title: 'Client Name', type: 'string' }),
    defineField({ name: 'sector', title: 'Sector', type: 'string', options: { list: ['textile','food','automotive','energy','chemical','construction','other'] } }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'challenge', title: 'Challenge', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'solution', title: 'Solution', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'results', title: 'Results', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'techStack', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'date' }),
  ],
  preview: { select: { title: 'title', subtitle: 'sector', media: 'coverImage' } },
})

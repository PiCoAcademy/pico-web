import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'durationMinutes', title: 'Duration (minutes)', type: 'number' }),
    defineField({ name: 'videoUrl', title: 'Video URL (YouTube / Vimeo)', type: 'url' }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }, { type: 'code' }] }),
    defineField({ name: 'free', title: 'Free Preview', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'order' } },
})

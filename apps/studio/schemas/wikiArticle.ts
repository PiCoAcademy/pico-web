import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'wikiArticle',
  title: 'Wiki Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['microcontrollers','sensors','protocols','plc','networking','software','hardware'] } }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }, { type: 'code' }] }),
    defineField({ name: 'relatedArticles', title: 'Related Articles', type: 'array', of: [{ type: 'reference', to: [{ type: 'wikiArticle' }] }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'updatedAt', title: 'Last Updated', type: 'datetime' }),
  ],
  preview: { select: { title: 'title', subtitle: 'category' } },
})

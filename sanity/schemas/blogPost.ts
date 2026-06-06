export const blogPost = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta',    title: 'Meta' },
    { name: 'seo',     title: 'SEO' },
  ],
  fields: [
    {
      name: 'title', type: 'localeString', title: 'Title',
      group: 'content', validation: (R: any) => R.required(),
    },
    {
      name: 'slug', type: 'slug', options: { source: 'title.fr' },
      group: 'content', validation: (R: any) => R.required(),
    },
    {
      name: 'excerpt', type: 'localeString', title: 'Excerpt (for cards + meta)',
      group: 'content',
    },
    {
      name: 'coverImage', type: 'image', title: 'Cover Image',
      options: { hotspot: true }, group: 'content',
    },
    {
      name: 'body', type: 'localeText', title: 'Body',
      group: 'content',
    },
    {
      name: 'author', type: 'reference', to: [{ type: 'author' }],
      group: 'meta',
    },
    {
      name: 'publishedAt', type: 'datetime', title: 'Published at',
      group: 'meta',
    },
    {
      name: 'tags', type: 'array', of: [{ type: 'string' }],
      options: { layout: 'tags' }, group: 'meta',
    },
    {
      name: 'site', title: 'Published on', type: 'string',
      options: { list: ['industrial', 'education', 'academy'] },
      group: 'meta',
    },
    {
      name: 'relatedPosts', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      validation: (R: any) => R.max(3), group: 'meta',
    },
  ],
  orderings: [
    {
      title: 'Published (newest)', name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
}

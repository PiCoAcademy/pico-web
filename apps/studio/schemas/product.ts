import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'sku', title: 'SKU', type: 'string' }),
    defineField({ name: 'priceMad', title: 'Price (MAD)', type: 'number', validation: R => R.required().min(0) }),
    defineField({ name: 'compareAtPrice', title: 'Compare-at Price (MAD)', type: 'number' }),
    defineField({ name: 'stock', title: 'Stock', type: 'number', initialValue: 0 }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['microcontrollers','sensors','actuators','displays','kits','tools','components'] } }),
    defineField({ name: 'brand', title: 'Brand', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'description', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'priceMad', media: 'images.0' } },
})

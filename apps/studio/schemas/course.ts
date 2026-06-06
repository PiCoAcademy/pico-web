import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'description', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'level', title: 'Level', type: 'string', options: { list: ['beginner','intermediate','advanced'] } }),
    defineField({ name: 'price', title: 'Price (MAD)', type: 'number', initialValue: 0 }),
    defineField({ name: 'durationHours', title: 'Duration (hours)', type: 'number' }),
    defineField({ name: 'lessonCount', title: 'Lesson Count', type: 'number' }),
    defineField({ name: 'studentCount', title: 'Student Count', type: 'number', initialValue: 0 }),
    defineField({ name: 'instructor', title: 'Instructor', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['arduino','raspberry-pi','plc','iot','cnc','python','electronics'] } }),
    defineField({ name: 'lessons', title: 'Lessons', type: 'array', of: [{ type: 'reference', to: [{ type: 'lesson' }] }] }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'level', media: 'coverImage' } },
})

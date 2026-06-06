export const caseStudy = {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title', type: 'localeString', title: 'Project Title',
      validation: (R: any) => R.required(),
    },
    { name: 'slug', type: 'slug', options: { source: 'title.fr' } },
    { name: 'client', type: 'string', title: 'Client / Industry' },
    {
      name: 'sector', type: 'string', title: 'Industry Sector',
      options: {
        list: ['textile', 'cnc', 'lpg', 'parking', 'water', 'agriculture', 'energy', 'other'],
      },
    },
    { name: 'challenge',  type: 'localeText', title: 'The Challenge' },
    { name: 'solution',   type: 'localeText', title: 'Our Solution' },
    { name: 'results',    type: 'localeText', title: 'Results & Impact' },
    {
      name: 'techStack', type: 'array', of: [{ type: 'string' }],
      title: 'Technologies Used', options: { layout: 'tags' },
    },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    {
      name: 'gallery', type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'isConfidential', type: 'boolean', title: 'Confidential (hide client name)',
      initialValue: false,
    },
    { name: 'publishedAt', type: 'date', title: 'Completion date' },
  ],
  preview: {
    select: { title: 'title.fr', subtitle: 'sector' },
    prepare: ({ title, subtitle }: any) => ({ title, subtitle }),
  },
}

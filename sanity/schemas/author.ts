export const author = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name',   type: 'string', title: 'Name' },
    { name: 'role',   type: 'string', title: 'Role / Title' },
    { name: 'avatar', type: 'image',  title: 'Photo', options: { hotspot: true } },
    { name: 'bio',    type: 'text',   title: 'Bio', rows: 3 },
  ],
}

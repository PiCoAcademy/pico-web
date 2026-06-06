import { createClient } from 'next-sanity'

const VALID_PROJECT_ID = /^[a-z0-9-]+$/

function getProjectId() {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return id && VALID_PROJECT_ID.test(id) ? id : 'aaaaaaaa'
}

export const sanityClient = createClient({
  projectId: getProjectId(),
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export const COURSES_QUERY = `*[_type == "course"] | order(_createdAt desc) {
  _id, slug, title, excerpt, level, price, lessonCount, durationHours, studentCount,
  "imageUrl": coverImage.asset->url
}`

export const COURSE_QUERY = `*[_type == "course" && slug.current == $slug][0] {
  _id, slug, title, description, level, price, lessonCount, durationHours, studentCount,
  "imageUrl": coverImage.asset->url,
  curriculum[] { title, lessons[]->{ _id, slug, title, durationMin, free } },
  instructor->{ name, bio, "avatarUrl": avatar.asset->url }
}`

import { createClient } from 'next-sanity'

const VALID_PROJECT_ID = /^[a-z0-9-]+$/

function getProjectId() {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return id && VALID_PROJECT_ID.test(id) ? id : 'aaaaaaaa'
}

export const sanityClient = createClient({
  projectId: getProjectId(),
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export const previewClient = createClient({
  projectId: getProjectId(),
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export function imageUrl(ref: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder'
  const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production'
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}

// ── GROQ queries ──────────────────────────────────────────────────────────────

export const CASE_STUDIES_QUERY = `
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id, slug, sector, techStack, isConfidential, publishedAt,
    "title": title.fr,
    "excerpt": coalesce(challenge.fr[0].children[0].text, "")
  }
`

export const CASE_STUDY_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, sector, techStack, isConfidential, publishedAt,
    client,
    "title":     title.fr,
    "challenge": challenge.fr,
    "solution":  solution.fr,
    "results":   results.fr,
    "coverImage": coverImage.asset->url,
  }
`

export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && site == "industrial"] | order(publishedAt desc) {
    _id, slug, tags, publishedAt,
    "title":    title.fr,
    "excerpt":  excerpt.fr,
    "coverUrl": coverImage.asset->url,
  }
`

export const BLOG_POST_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && site == "industrial"][0] {
    _id, tags, publishedAt,
    "title":   title.fr,
    "excerpt": excerpt.fr,
    "body":    body.fr,
    "coverUrl": coverImage.asset->url,
    "author": author->{ name, role, "avatarUrl": avatar.asset->url },
    "related": relatedPosts[]->{ slug, "title": title.fr, "excerpt": excerpt.fr }
  }
`

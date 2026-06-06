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

export const WIKI_NAV_QUERY = `
  *[_type == "wikiArticle"] | order(order asc) {
    _id, section, order,
    "slug": slug.current,
    "title": title.fr,
  }
`

export const WIKI_ARTICLE_QUERY = `
  *[_type == "wikiArticle" && slug.current == $slug][0] {
    _id, section, lastReviewed,
    "slug": slug.current,
    "title": title.fr,
    "body": body.fr,
    "toc": toc[]{ anchor, "title": title.fr },
  }
`

export const WIKI_SECTION_QUERY = `
  *[_type == "wikiArticle" && section == $section] | order(order asc) {
    _id, "slug": slug.current, "title": title.fr, "excerpt": excerpt.fr
  }
`

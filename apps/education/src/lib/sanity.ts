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

export const PRODUCTS_QUERY = `
  *[_type == "product" && isActive == true] | order(name.fr asc) {
    _id, slug, sku, priceMad,
    "name":    name.fr,
    "tagline": tagline.fr,
    "imageUrl": mainImage.asset->url,
    "category": category->{ "name": name.fr, "slug": slug.current }
  }
`

export const PRODUCT_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id, sku, priceMad, priceEur, specs, contents, demoVideo,
    "name":        name.fr,
    "tagline":     tagline.fr,
    "description": description.fr,
    "imageUrl":    mainImage.asset->url,
    "gallery":     gallery[].asset->url,
    "downloads":   downloads[]{ "label": label.fr, file, type },
    "related": relatedProducts[]->{ slug, "name": name.fr, "imageUrl": mainImage.asset->url, priceMad }
  }
`

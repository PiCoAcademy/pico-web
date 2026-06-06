import { useTranslations } from 'next-intl'
import { Container, PageHero, CaseStudyCard } from '@pico/ui'
import { sanityClient, CASE_STUDIES_QUERY } from '@/lib/sanity'

export const revalidate = 3600

type CaseStudy = {
  _id: string
  slug: { current: string }
  sector: string
  techStack: string[]
  title: string
  excerpt: string
}

export default async function ProjectsPage() {
  const caseStudies: CaseStudy[] = await sanityClient.fetch(CASE_STUDIES_QUERY).catch(() => [])

  return <Projects caseStudies={caseStudies} />
}

function Projects({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        <PageHero
          eyebrow={t('projects.title')}
          title={t('projects.title')}
          description={t('projects.sub')}
        />

        {caseStudies.length === 0 ? (
          <p className="mt-10 text-text-muted">{t('projects.empty')}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <CaseStudyCard
                key={cs._id}
                slug={cs.slug.current}
                title={cs.title}
                sector={cs.sector}
                techStack={cs.techStack ?? []}
                excerpt={cs.excerpt}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

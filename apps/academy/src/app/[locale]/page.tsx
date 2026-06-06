import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container, Badge } from '@pico/ui'
import { sanityClient, COURSES_QUERY } from '@/lib/sanity'

export const revalidate = 3600

type Course = {
  _id: string
  slug: { current: string }
  title: string
  excerpt: string
  level: string
  price: number
  lessonCount: number
  durationHours: number
  imageUrl: string | null
}

const FEATURED_COURSES: Course[] = [
  { _id: '1', slug: { current: 'arduino-debutant' }, title: 'Arduino pour Débutants', excerpt: 'Maîtrisez les bases de l\'électronique et de la programmation avec Arduino.', level: 'beginner', price: 0, lessonCount: 12, durationHours: 6, imageUrl: null },
  { _id: '2', slug: { current: 'raspberry-pi-iot' }, title: 'IoT avec Raspberry Pi', excerpt: 'Créez des objets connectés avec Raspberry Pi et Python.', level: 'intermediate', price: 299, lessonCount: 18, durationHours: 10, imageUrl: null },
  { _id: '3', slug: { current: 'ia-embarquee' }, title: 'IA Embarquée avec TensorFlow Lite', excerpt: 'Déployez des modèles d\'IA sur microcontrôleurs ESP32 et Arduino.', level: 'advanced', price: 499, lessonCount: 24, durationHours: 15, imageUrl: null },
]

const LEVEL_COLORS = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'accent',
} as const

export default async function AcademyLanding() {
  const courses: Course[] = await sanityClient.fetch(COURSES_QUERY).catch(() => [])
  const featured = (courses.length > 0 ? courses : FEATURED_COURSES).slice(0, 3)
  return <Landing featured={featured} />
}

function Landing({ featured }: { featured: Course[] }) {
  const t = useTranslations()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 60% 30%, rgba(124,58,237,0.18) 0%, transparent 70%)' }}
        />
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t('hero.eyebrow')}
              </p>
              <h1 className="mt-4 whitespace-pre-line font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-tight text-text-primary">
                {t('hero.headline')}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">
                {t('hero.sub')}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="./courses"
                  className="inline-flex items-center gap-2 rounded-btn bg-[var(--accent)] px-8 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
                >
                  {t('hero.ctaPrimary')} →
                </Link>
                <Link
                  href="./paths"
                  className="inline-flex items-center gap-2 rounded-btn border border-[var(--border)] px-6 py-3 text-base font-semibold text-text-muted transition-colors hover:text-text-primary"
                >
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t('stats.courses'), value: '20+' },
                { label: t('stats.students'), value: '500+' },
                { label: t('stats.hours'), value: '200+' },
                { label: t('stats.mentors'), value: '8' },
              ].map((s) => (
                <div key={s.label} className="rounded-card border border-[var(--border)] bg-bg-card p-6 text-center">
                  <p className="font-display text-3xl font-black text-[var(--accent)]">{s.value}</p>
                  <p className="mt-1 text-sm text-text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured courses */}
      <section className="pb-24">
        <Container>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-h2 font-bold text-text-primary">{t('courses.title')}</h2>
            <Link href="./courses" className="text-sm font-semibold text-[var(--accent)] hover:underline">
              Voir tout →
            </Link>
          </div>
          <p className="mt-2 text-text-muted">{t('courses.sub')}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((course) => (
              <Link
                key={course._id}
                href={`./course/${course.slug.current}`}
                className="group flex flex-col rounded-card border border-[var(--border)] bg-bg-card overflow-hidden transition-colors hover:border-[var(--accent)]"
              >
                <div className="aspect-video bg-[var(--accent-bg)] flex items-center justify-center text-5xl">
                  🎓
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <Badge variant={LEVEL_COLORS[course.level as keyof typeof LEVEL_COLORS] ?? 'neutral'} size="xs">
                      {t(`courses.${course.level}`)}
                    </Badge>
                    {course.price === 0 && <Badge variant="success" size="xs">{t('course.free')}</Badge>}
                  </div>
                  <h3 className="mt-3 flex-1 font-display text-base font-bold text-text-primary leading-snug">
                    {course.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-text-muted">{course.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                    <span>{course.lessonCount} {t('courses.lessons')}</span>
                    <span>{course.durationHours}h</span>
                    {course.price > 0
                      ? <span className="font-bold text-[var(--accent)]">{course.price} MAD</span>
                      : <span className="font-bold text-green-400">{t('course.free')}</span>
                    }
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA banner */}
      <section className="pb-24">
        <Container>
          <div className="rounded-card border border-[var(--accent-bd)] bg-[var(--accent-bg)] p-12 text-center">
            <h2 className="font-display text-h2 font-bold text-text-primary">
              Commencez à apprendre aujourd&apos;hui
            </h2>
            <p className="mt-3 text-text-muted">
              Rejoignez des centaines d&apos;étudiants marocains qui maîtrisent l&apos;électronique avec PICO Academy.
            </p>
            <Link
              href="./courses"
              className="mt-8 inline-flex items-center gap-2 rounded-btn bg-[var(--accent)] px-8 py-3 text-base font-bold text-white hover:opacity-90"
            >
              {t('hero.ctaPrimary')} →
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container, Badge, Button } from '@pico/ui'
import { sanityClient, COURSE_QUERY, COURSES_QUERY } from '@/lib/sanity'

export const revalidate = 3600

type Lesson = {
  _id: string
  slug: { current: string }
  title: string
  durationMin: number
  free?: boolean
}

type Module = {
  title: string
  lessons: Lesson[]
}

type Course = {
  _id: string
  slug: { current: string }
  title: string
  description: string
  level: string
  price: number
  lessonCount: number
  durationHours: number
  studentCount: number
  curriculum?: Module[]
  instructor?: { name: string; bio: string; avatarUrl?: string }
  imageUrl: string | null
}

const STATIC_COURSES: Course[] = [
  {
    _id: '1',
    slug: { current: 'arduino-debutant' },
    title: 'Arduino pour Débutants',
    description: 'Ce cours vous guide pas à pas dans la maîtrise de l\'Arduino. Vous apprendrez à programmer en C++, à câbler des composants électroniques et à réaliser des projets complets.',
    level: 'beginner',
    price: 0,
    lessonCount: 12,
    durationHours: 6,
    studentCount: 142,
    curriculum: [
      {
        title: 'Module 1 — Prise en main',
        lessons: [
          { _id: 'l1', slug: { current: 'introduction' }, title: 'Introduction à Arduino', durationMin: 15, free: true },
          { _id: 'l2', slug: { current: 'ide-arduino' }, title: 'Installer l\'IDE Arduino', durationMin: 20, free: true },
          { _id: 'l3', slug: { current: 'premier-programme' }, title: 'Votre premier programme', durationMin: 25, free: false },
        ],
      },
      {
        title: 'Module 2 — Composants de base',
        lessons: [
          { _id: 'l4', slug: { current: 'leds-resistances' }, title: 'LEDs et résistances', durationMin: 30, free: false },
          { _id: 'l5', slug: { current: 'boutons-poussoirs' }, title: 'Boutons et entrées digitales', durationMin: 25, free: false },
          { _id: 'l6', slug: { current: 'capteurs-analogiques' }, title: 'Capteurs analogiques', durationMin: 35, free: false },
        ],
      },
    ],
    instructor: { name: 'Youssef Benali', bio: 'Ingénieur électronique diplômé de l\'ENSA Marrakech, 8 ans d\'expérience en systèmes embarqués.', avatarUrl: undefined },
    imageUrl: null,
  },
]

export async function generateStaticParams() {
  const courses: Course[] = await sanityClient.fetch(COURSES_QUERY).catch(() => [])
  const all = courses.length > 0 ? courses : STATIC_COURSES
  return all.map((c) => ({ slug: c.slug.current }))
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const fetched: Course | null = await sanityClient.fetch(COURSE_QUERY, { slug }).catch(() => null)
  const course = fetched ?? STATIC_COURSES.find((c) => c.slug.current === slug) ?? null
  if (!course) notFound()
  return <CourseDetail course={course} />
}

const LEVEL_COLORS = { beginner: 'success', intermediate: 'warning', advanced: 'accent' } as const

function CourseDetail({ course }: { course: Course }) {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
          <Link href="../../" className="hover:text-text-primary">Accueil</Link>
          <span>›</span>
          <Link href="../courses" className="hover:text-text-primary">{t('courses.title')}</Link>
          <span>›</span>
          <span className="text-text-primary">{course.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={LEVEL_COLORS[course.level as keyof typeof LEVEL_COLORS] ?? 'neutral'}>
                {t(`courses.${course.level}`)}
              </Badge>
              {course.price === 0 && <Badge variant="success">{t('course.free')}</Badge>}
              <Badge variant="neutral">{t('course.certificate')}</Badge>
            </div>
            <h1 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-black leading-tight text-text-primary">
              {course.title}
            </h1>
            <p className="mt-5 leading-relaxed text-text-muted">{course.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-text-muted">
              <span>📚 {course.lessonCount} {t('course.lessons')}</span>
              <span>⏱ {course.durationHours}h</span>
              <span>👥 {course.studentCount} {t('courses.students')}</span>
            </div>

            {/* Curriculum */}
            {course.curriculum && course.curriculum.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-h2 font-bold text-text-primary">{t('course.curriculum')}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {course.curriculum.map((mod, mi) => (
                    <div key={mi} className="rounded-card border border-[var(--border)] bg-bg-card overflow-hidden">
                      <div className="border-b border-[var(--border)] px-5 py-3">
                        <h3 className="font-semibold text-text-primary">{mod.title}</h3>
                      </div>
                      <ul className="flex flex-col">
                        {mod.lessons?.map((lesson, li) => (
                          <li
                            key={lesson._id}
                            className={`flex items-center justify-between px-5 py-3 text-sm ${li < (mod.lessons.length - 1) ? 'border-b border-[var(--border)]' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-text-muted">{lesson.free ? '▶' : '🔒'}</span>
                              <span className={lesson.free ? 'text-text-primary' : 'text-text-muted'}>
                                {lesson.title}
                              </span>
                              {lesson.free && <Badge variant="success" size="xs">Gratuit</Badge>}
                            </div>
                            <span className="text-xs text-text-muted">{lesson.durationMin} min</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor */}
            {course.instructor && (
              <div className="mt-10">
                <h2 className="font-display text-h2 font-bold text-text-primary">{t('course.instructor')}</h2>
                <div className="mt-4 flex items-start gap-4 rounded-card border border-[var(--border)] bg-bg-card p-5">
                  <div className="h-14 w-14 flex-shrink-0 rounded-full bg-[var(--accent-bg)] flex items-center justify-center text-2xl">
                    👨‍🏫
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{course.instructor.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="self-start rounded-card border border-[var(--border)] bg-bg-card p-6 lg:sticky lg:top-20">
            <div className="aspect-video rounded-md bg-[var(--accent-bg)] flex items-center justify-center text-6xl mb-5">
              🎓
            </div>
            <div className="mb-4 text-center">
              {course.price === 0 ? (
                <p className="font-display text-2xl font-bold text-green-400">{t('course.free')}</p>
              ) : (
                <p className="font-display text-2xl font-bold text-[var(--accent)]">{course.price} MAD</p>
              )}
            </div>
            <Button size="lg" className="w-full">{t('course.enroll')}</Button>
            <ul className="mt-5 flex flex-col gap-2 text-xs text-text-muted">
              <li>✓ {course.lessonCount} {t('course.lessons')} vidéo</li>
              <li>✓ {course.durationHours}h de contenu</li>
              <li>✓ {t('course.certificate')}</li>
              <li>✓ Accès à vie</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

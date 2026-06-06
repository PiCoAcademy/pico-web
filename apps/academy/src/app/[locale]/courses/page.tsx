import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container, PageHero, Badge } from '@pico/ui'
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
  studentCount: number
  imageUrl: string | null
}

const STATIC_COURSES: Course[] = [
  { _id: '1', slug: { current: 'arduino-debutant' }, title: 'Arduino pour Débutants', excerpt: 'Maîtrisez les bases de l\'électronique et de la programmation avec Arduino.', level: 'beginner', price: 0, lessonCount: 12, durationHours: 6, studentCount: 142, imageUrl: null },
  { _id: '2', slug: { current: 'raspberry-pi-iot' }, title: 'IoT avec Raspberry Pi', excerpt: 'Créez des objets connectés avec Raspberry Pi et Python.', level: 'intermediate', price: 299, lessonCount: 18, durationHours: 10, studentCount: 89, imageUrl: null },
  { _id: '3', slug: { current: 'ia-embarquee' }, title: 'IA Embarquée avec TensorFlow Lite', excerpt: 'Déployez des modèles d\'IA sur microcontrôleurs ESP32 et Arduino.', level: 'advanced', price: 499, lessonCount: 24, durationHours: 15, studentCount: 34, imageUrl: null },
  { _id: '4', slug: { current: 'python-electronique' }, title: 'Python pour l\'Électronique', excerpt: 'Utilisez Python pour contrôler des composants électroniques et analyser des données.', level: 'beginner', price: 199, lessonCount: 15, durationHours: 8, studentCount: 201, imageUrl: null },
  { _id: '5', slug: { current: 'esp32-wifi-bluetooth' }, title: 'ESP32 — WiFi & Bluetooth', excerpt: 'Maîtrisez l\'ESP32 pour des projets IoT avancés avec connectivité sans fil.', level: 'intermediate', price: 349, lessonCount: 20, durationHours: 12, studentCount: 67, imageUrl: null },
  { _id: '6', slug: { current: 'pcb-kicad' }, title: 'Conception PCB avec KiCad', excerpt: 'Concevez vos propres circuits imprimés avec KiCad, de la schématique au prototype.', level: 'intermediate', price: 399, lessonCount: 16, durationHours: 11, studentCount: 45, imageUrl: null },
]

const LEVEL_COLORS = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'accent',
} as const

export default async function CoursesPage() {
  const fetched: Course[] = await sanityClient.fetch(COURSES_QUERY).catch(() => [])
  const courses = fetched.length > 0 ? fetched : STATIC_COURSES
  return <Courses courses={courses} />
}

function Courses({ courses }: { courses: Course[] }) {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        <PageHero
          eyebrow={t('courses.title')}
          title={t('courses.title')}
          description={t('courses.sub')}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course._id}
              href={`../course/${course.slug.current}`}
              className="group flex flex-col rounded-card border border-[var(--border)] bg-bg-card overflow-hidden transition-colors hover:border-[var(--accent)]"
            >
              <div className="aspect-video bg-[var(--accent-bg)] flex items-center justify-center text-5xl">
                🎓
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
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
                  <span>{course.lessonCount} {t('courses.lessons')} · {course.durationHours}h</span>
                  {course.price > 0
                    ? <span className="font-bold text-[var(--accent)]">{course.price} MAD</span>
                    : <span className="font-bold text-green-400">{t('course.free')}</span>
                  }
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
                  <span>👥</span>
                  <span>{course.studentCount} {t('courses.students')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

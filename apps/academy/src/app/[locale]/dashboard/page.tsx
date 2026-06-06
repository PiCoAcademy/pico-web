import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@pico/ui'

const MOCK_ENROLLMENTS = [
  { slug: 'arduino-debutant', title: 'Arduino pour Débutants', progress: 67, totalLessons: 12, completedLessons: 8 },
  { slug: 'python-electronique', title: 'Python pour l\'Électronique', progress: 20, totalLessons: 15, completedLessons: 3 },
]

export default function DashboardPage() {
  return <Dashboard />
}

function Dashboard() {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        <h1 className="font-display text-h1 font-bold text-text-primary">{t('dashboard.title')}</h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="flex flex-col gap-1">
            {[
              { label: t('dashboard.courses'), active: true },
              { label: t('dashboard.certificates'), active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`rounded-btn px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                  item.active
                    ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </aside>

          {/* Main content */}
          <div>
            <h2 className="mb-5 font-display text-h2 font-bold text-text-primary">{t('dashboard.courses')}</h2>
            {MOCK_ENROLLMENTS.length === 0 ? (
              <div className="rounded-card border border-[var(--border)] bg-bg-card p-8 text-center">
                <p className="text-text-muted">{t('dashboard.noCourses')}</p>
                <Link href="../courses" className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] hover:underline">
                  Découvrir les formations →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {MOCK_ENROLLMENTS.map((enrollment) => (
                  <div key={enrollment.slug} className="rounded-card border border-[var(--border)] bg-bg-card p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-bold text-text-primary truncate">{enrollment.title}</h3>
                        <p className="mt-1 text-xs text-text-muted">
                          {enrollment.completedLessons}/{enrollment.totalLessons} leçons
                        </p>
                      </div>
                      <Link
                        href={`../course/${enrollment.slug}`}
                        className="flex-shrink-0 rounded-btn bg-[var(--accent)] px-4 py-2 text-xs font-bold text-white hover:opacity-90"
                      >
                        {t('dashboard.continue')}
                      </Link>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-4 h-1.5 rounded-full bg-bg-base overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--accent)]"
                        style={{ width: `${enrollment.progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-right text-xs text-text-muted">{enrollment.progress}%</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

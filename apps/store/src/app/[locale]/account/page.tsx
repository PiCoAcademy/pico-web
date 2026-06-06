import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Container } from '@pico/ui'

const MOCK_ORDERS = [
  { id: 'ORD-2024-001', date: '2024-11-15', total: 1247, status: 'Livré', items: 3 },
  { id: 'ORD-2024-002', date: '2024-12-02', total: 389, status: 'En transit', items: 1 },
]

export default function AccountPage() {
  return <Account />
}

function Account() {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        <h1 className="font-display text-h1 font-bold text-text-primary">{t('account.orders')}</h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="flex flex-col gap-1">
            {[
              { label: t('account.orders'), href: './account', active: true },
              { label: t('account.profile'), href: './account/profile', active: false },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-btn px-4 py-2.5 text-sm font-semibold transition-colors ${
                  item.active
                    ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button className="mt-4 rounded-btn px-4 py-2.5 text-left text-sm font-semibold text-red-400 hover:bg-red-400/10 transition-colors">
              {t('account.logout')}
            </button>
          </aside>

          {/* Orders list */}
          <div className="flex flex-col gap-4">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-card border border-[var(--border)] bg-bg-card p-5"
              >
                <div>
                  <p className="font-mono text-sm font-bold text-text-primary">{order.id}</p>
                  <p className="mt-1 text-xs text-text-muted">{order.date} · {order.items} article{order.items > 1 ? 's' : ''}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-display text-base font-bold text-[var(--accent)]">
                    {order.total.toFixed(2)} MAD
                  </span>
                  <span className={`text-xs font-semibold ${order.status === 'Livré' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button, Badge } from '@pico/ui'
import { submitRfq, type RfqPayload } from '@/app/actions/rfq'

type Step = 1 | 2 | 3 | 4

const TOTAL = 4

const INPUT_CLASS =
  'h-11 w-full rounded-btn border border-[var(--border)] bg-bg-card-2 px-3.5 text-sm text-text-primary placeholder:text-text-muted focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-bg)] transition-colors'

const SELECT_CLASS =
  'h-11 w-full rounded-btn border border-[var(--border)] bg-bg-card-2 px-3.5 text-sm text-text-primary focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-bg)] transition-colors'

const TEXTAREA_CLASS =
  'w-full resize-none rounded-btn border border-[var(--border)] bg-bg-card-2 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-bg)] transition-colors'

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-text-primary">
      {children}
      {required && <span className="ml-0.5 text-[var(--error)]">*</span>}
    </label>
  )
}

function Field({
  label, name, type = 'text', required, placeholder, defaultValue,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label required={required}>{label}</Label>
      <input name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} className={INPUT_CLASS} />
    </div>
  )
}

export function RfqForm() {
  const t = useTranslations('rfq')
  const [step, setStep] = React.useState<Step>(1)
  const [data, setData] = React.useState<Partial<RfqPayload>>({})
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const formRef = React.useRef<HTMLFormElement>(null)

  function collect() {
    const fd = new FormData(formRef.current!)
    const patch: Partial<RfqPayload> = {}
    for (const [k, v] of fd.entries()) patch[k as keyof RfqPayload] = v as string
    return patch
  }

  function handleNext() {
    const patch = collect()
    setData((prev) => ({ ...prev, ...patch }))
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s))
  }

  function handleBack() {
    const patch = collect()
    setData((prev) => ({ ...prev, ...patch }))
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const final = { ...data, ...collect() } as RfqPayload
    setStatus('submitting')
    const res = await submitRfq(final)
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="flex items-start gap-3 rounded-card border border-emerald-500/20 bg-emerald-500/10 p-6 text-emerald-400">
        <CheckCircle size={20} strokeWidth={1.75} className="mt-0.5 flex-shrink-0" />
        <p>{t('success')}</p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => (
          <React.Fragment key={n}>
            <div
              className={[
                'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                n === step
                  ? 'bg-[var(--accent)] text-white'
                  : n < step
                  ? 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-bd)]'
                  : 'bg-bg-card-2 text-text-muted border border-[var(--border)]',
              ].join(' ')}
            >
              {n}
            </div>
            {n < TOTAL && (
              <div className={['h-px flex-1 transition-colors', n < step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'].join(' ')} />
            )}
          </React.Fragment>
        ))}
      </div>

      <Badge variant="neutral" size="sm">
        {t('stepOf', { current: step, total: TOTAL })}
      </Badge>

      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-card border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertCircle size={16} strokeWidth={1.75} className="mt-0.5 flex-shrink-0" />
          {t('error')}
        </div>
      )}

      {/* ── Step 1 ── */}
      {step === 1 && (
        <div className="space-y-5 animate-fadeUp">
          <h2 className="font-display text-h2 font-bold text-text-primary">{t('step1.title')}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t('step1.company')} name="company" required defaultValue={data.company} />
            <Field label={t('step1.sector')}  name="sector"  required defaultValue={data.sector} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t('step1.name')}  name="name"  required defaultValue={data.name} />
            <Field label={t('step1.email')} name="email" type="email" required defaultValue={data.email} />
          </div>
          <Field label={t('step1.phone')} name="phone" type="tel" defaultValue={data.phone} />
        </div>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <div className="space-y-5 animate-fadeUp">
          <h2 className="font-display text-h2 font-bold text-text-primary">{t('step2.title')}</h2>
          <div className="space-y-1.5">
            <Label required>{t('step2.type')}</Label>
            <select name="type" required defaultValue={data.type ?? ''} className={SELECT_CLASS}>
              <option value="" disabled>—</option>
              {(['automation','cnc','iot','energy','other'] as const).map((k) => (
                <option key={k} value={k}>{t(`step2.types.${k}`)}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label required>{t('step2.brief')}</Label>
            <textarea
              name="brief"
              required
              rows={6}
              defaultValue={data.brief}
              placeholder={t('step2.briefPlaceholder')}
              className={TEXTAREA_CLASS}
            />
          </div>
        </div>
      )}

      {/* ── Step 3 ── */}
      {step === 3 && (
        <div className="space-y-5 animate-fadeUp">
          <h2 className="font-display text-h2 font-bold text-text-primary">{t('step3.title')}</h2>
          <div className="space-y-1.5">
            <Label required>{t('step3.budget')}</Label>
            <select name="budget" required defaultValue={data.budget ?? ''} className={SELECT_CLASS}>
              <option value="" disabled>—</option>
              {(['lt50k','50k_150k','150k_500k','gt500k','unknown'] as const).map((k) => (
                <option key={k} value={k}>{t(`step3.budgets.${k}`)}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label required>{t('step3.timeline')}</Label>
            <select name="timeline" required defaultValue={data.timeline ?? ''} className={SELECT_CLASS}>
              <option value="" disabled>—</option>
              {(['urgent','short','medium','long'] as const).map((k) => (
                <option key={k} value={k}>{t(`step3.timelines.${k}`)}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ── Step 4 — Summary ── */}
      {step === 4 && (
        <div className="space-y-5 animate-fadeUp">
          <h2 className="font-display text-h2 font-bold text-text-primary">{t('step4.title')}</h2>
          <div className="rounded-card border border-[var(--border)] bg-bg-card divide-y divide-[var(--border)]">
            {[
              ['Société', data.company],
              ['Secteur', data.sector],
              ['Contact', data.name],
              ['Email',   data.email],
              ['Téléphone', data.phone],
              ['Type de projet', data.type],
              ['Budget', data.budget],
              ['Délai', data.timeline],
            ].map(([k, v]) => v && (
              <div key={k} className="flex gap-4 px-5 py-3 text-sm">
                <span className="w-28 flex-shrink-0 text-text-muted">{k}</span>
                <span className="text-text-primary">{v}</span>
              </div>
            ))}
          </div>
          {data.brief && (
            <div className="rounded-card border border-[var(--border)] bg-bg-card p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Description</p>
              <p className="text-sm leading-relaxed text-text-muted-2">{data.brief}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        {step > 1 ? (
          <Button type="button" variant="ghost" onClick={handleBack} icon={<ChevronLeft size={16} />}>
            {t('back')}
          </Button>
        ) : (
          <span />
        )}

        {step < 4 ? (
          <Button type="button" onClick={handleNext} icon={<ChevronRight size={16} />} iconPosition="right">
            {t('next')}
          </Button>
        ) : (
          <Button
            type="submit"
            loading={status === 'submitting'}
            size="lg"
          >
            {status === 'submitting' ? t('step4.sending') : t('step4.submit')}
          </Button>
        )}
      </div>
    </form>
  )
}

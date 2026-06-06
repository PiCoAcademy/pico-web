'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@pico/ui'
import { sendContactEmail } from '@/app/actions/contact'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contactPage.form')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const fd = new FormData(e.currentTarget)
    const result = await sendContactEmail({
      name:    fd.get('name')    as string,
      email:   fd.get('email')   as string,
      subject: fd.get('subject') as string,
      message: fd.get('message') as string,
    })

    setStatus(result.ok ? 'success' : 'error')
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
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-card border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertCircle size={16} strokeWidth={1.75} className="mt-0.5 flex-shrink-0" />
          {t('error')}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('name')} name="name" type="text" required />
        <Field label={t('email')} name="email" type="email" required />
      </div>
      <Field label={t('subject')} name="subject" type="text" required />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-primary">
          {t('message')} <span className="text-[var(--error)]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full resize-none rounded-btn border border-[var(--border)] bg-bg-card-2 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-bg)] transition-colors"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        loading={status === 'loading'}
        className="w-full sm:w-auto"
      >
        {status === 'loading' ? t('sending') : t('submit')}
      </Button>
    </form>
  )
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-[var(--error)]">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="h-11 w-full rounded-btn border border-[var(--border)] bg-bg-card-2 px-3.5 text-sm text-text-primary placeholder:text-text-muted focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-bg)] transition-colors"
      />
    </div>
  )
}

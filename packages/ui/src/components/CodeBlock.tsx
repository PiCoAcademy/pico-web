'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../lib/cn'

export interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
  /** Pre-rendered HTML from shiki — pass this from a server component */
  highlightedHtml?: string
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = false,
  className,
  highlightedHtml,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'rounded-[10px] border border-[var(--border)] bg-bg-card overflow-hidden',
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-white/[0.03] px-4 py-2">
        <span className="font-mono text-xs text-text-muted">
          {filename ?? language}
        </span>
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copié' : 'Copier le code'}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-text-muted transition-colors hover:text-text-primary"
        >
          {copied ? (
            <><Check size={12} strokeWidth={2} className="text-[var(--accent)]" /> Copié</>
          ) : (
            <><Copy size={12} strokeWidth={1.75} /> Copier</>
          )}
        </button>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto p-5">
        {highlightedHtml ? (
          <div
            className="text-code text-sm leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className={cn('text-sm leading-relaxed text-text-primary', showLineNumbers && 'pl-4')}>
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

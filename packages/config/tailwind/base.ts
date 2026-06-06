import type { Config } from 'tailwindcss'

export const baseConfig: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      colors: {
        'bg-base':   '#030712',
        'bg-card':   '#0D1117',
        'bg-card-2': '#111827',
        'bg-hover':  '#1C2333',
        'text-primary':  '#F1F5F9',
        'text-muted':    '#64748B',
        'text-muted-2':  '#94A3B8',
        'text-inverse':  '#030712',
      },
      borderRadius: {
        card: '14px',
        btn:  '8px',
        chip: '4px',
        pill: '9999px',
      },
      fontSize: {
        'hero': ['clamp(2.25rem,5vw,4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.04em' }],
        'h1':   ['clamp(1.75rem,4vw,3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'h2':   ['clamp(1.375rem,3vw,2.25rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h3':   ['1.25rem', { lineHeight: '1.3',  letterSpacing: '-0.02em' }],
        'h4':   ['1rem',    { lineHeight: '1.4' }],
        'body-lg': ['1rem',   { lineHeight: '1.7' }],
        'body':    ['0.875rem', { lineHeight: '1.65' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}

import { baseConfig } from '@pico/config/tailwind'
import type { Config } from 'tailwindcss'

const config: Config = {
  ...baseConfig,
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      colors: {
        ...baseConfig.theme?.extend?.colors,
        accent: '#7C3AED',
        'accent-lt': '#A78BFA',
      },
    },
  },
}

export default config

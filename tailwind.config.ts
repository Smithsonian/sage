/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
import containerQueries from '@tailwindcss/container-queries'
import colors from 'tailwindcss/colors'
import type { Config } from 'tailwindcss'

export default {
  content: ['./resources/views/**/*.edge', './inertia/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins', 'system-ui', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.emerald,
      secondary: colors.pink,
      accent: colors.indigo,
      neutral: colors.neutral,
      success: 'hsl(85, 85%, 35%)',
      info: 'hsl(199, 70%, 29%)',
      warning: 'hsl(26, 81%, 52%)',
      error: 'hsl(357, 84%, 63%)',
    },
  },
  plugins: [forms, aspectRatio, containerQueries],
} satisfies Config

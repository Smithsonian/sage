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
      success: colors.teal,
      info: colors.cyan,
      error: colors.rose,
    },
  },
  plugins: [forms, aspectRatio, containerQueries],
} satisfies Config

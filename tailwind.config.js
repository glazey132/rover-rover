/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          bg: '#07080f',
          surface: '#0e1017',
          elevated: '#14161f',
          border: 'rgba(255,255,255,0.07)',
          'border-strong': 'rgba(255,255,255,0.14)',
        },
        text: {
          primary: '#eef0f6',
          secondary: '#8b92a8',
          muted: '#4a5068',
          inverse: '#07080f',
        },
        accent: {
          rover: '#f97316',
          weather: '#8b5cf6',
          earth: '#14b8a6',
          asteroid: '#f59e0b',
          blue: '#3b82f6',
        },
        status: {
          success: '#22c55e',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}

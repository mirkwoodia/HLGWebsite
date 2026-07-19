import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f5f6ed',
          100: '#e7e9d2',
          200: '#d1d5a9',
          300: '#b3ba79',
          400: '#98a154',
          500: '#7c8639',
          600: '#5f682c',
          700: '#495026',
          800: '#3c4123',
          900: '#343821',
          950: '#1a1d10',
        },
        sand: {
          50: '#fdfaf4',
          100: '#faf3e3',
          200: '#f3e3c1',
          300: '#e9cc94',
          400: '#ddac63',
          500: '#d2913f',
          600: '#c17a33',
          700: '#a1602b',
          800: '#814d2a',
          900: '#684024',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;

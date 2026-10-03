// Tailwind CSS configuration for the RegMedInk dark/clinical brand theme.
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary background — near-black, matches the InkBinder clinical look.
        ink: {
          950: '#0b0b10',
          900: '#121218',
          800: '#1a1a22',
        },
        // Gold/amber accent used sparingly for highlights and brand marks.
        gold: {
          300: '#e4c583',
          400: '#d4af6a',
          500: '#c79a4b',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

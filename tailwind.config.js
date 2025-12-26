/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#13ec5b',
          dark: '#0fd650',
          light: '#a3f8bc'
        },
        background: {
          light: '#f6f8f6',
          dark: '#102216'
        },
        surface: {
          light: '#ffffff',
          dark: '#1a2e22'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif']
      }
    }
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}

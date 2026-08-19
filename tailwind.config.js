/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0560FD',
          dark: '#1e232d',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"SF Pro"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-soft': 'bounce 1.5s infinite',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#202125',
        'dark-bg': '#141518',
        'light-bg': '#43454B',
        'main-orange': '#D79845',
        'light-orange': '#E5AF07',
        'dark-orange': '#E59344',
        'dark-gray': '#2A2C33',
        'main-gray': '#9BA3A9',
        'error': '#E74C3C',
        'logo-blue': '#4DACF0'
      },
      fontFamily: {
        'logo': 'Industrial Branding',
        'main': ['Inter', 'sans-serif'],
        'secondary': ['Roboto', 'sans-serif']
      },
      fontSize: {
        'logo': 'clamp(1.25rem, 2vw, 2rem)'
      }
    },
  },
  plugins: [],
}


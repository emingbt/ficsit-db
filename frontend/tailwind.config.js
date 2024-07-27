/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      height: {
        'base': 'calc(100vh - 6.5rem)',
        'base-lg': 'calc(100vh - 8rem)',
      },
      minHeight: {
        'base': 'calc(100vh - 6.5rem)',
        'base-lg': 'calc(100vh - 8rem)',
      },
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


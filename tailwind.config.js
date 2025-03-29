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
        'base': 'calc(100vh - 8.5rem)',
        'base-lg': 'calc(100vh - 10rem)',
      },
      minHeight: {
        'base': 'calc(100vh - 6.5rem)',
        'base-lg': 'calc(100vh - 8rem)',
        'content': 'calc(100vh - 6.5rem - 20px)',
        'content-lg': 'calc(100vh - 8rem - 10px)',
        'content-xl': 'calc(100vh - 8rem - 2rem)',
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
        'logo-blue': '#4DACF0',
        'avatar-gray': '#3E3E3E',
        'avatar-purple': '#7D53DE',
        'avatar-indigo': '#0D3B66 ',
        'avatar-blue': '#4DACF0',
        'avatar-green': '#67AC5D',
        'avatar-yellow': '#FDE047',
        'avatar-orange': '#D79845',
        'avatar-red': '#D63230',
        'avatar-pink': '#CF4ACF',
      },
      fontFamily: {
        'logo': 'Industrial Branding',
        'main': "var(--font-main)",
        'secondary': "var(--font-secondary)",
      },
      fontSize: {
        'logo': 'clamp(1.25rem, 2vw, 2rem)'
      },
      backgroundImage: {
        foo: 'repeating-linear-gradient(-60deg, #052338 0 20px, #031726 20px 40px)',
      },
      screens: {
        '3xl': '1600px',
      },
    },
  },
  safelist: [
    'bg-avatar-gray',
    'bg-avatar-purple',
    'bg-avatar-indigo',
    'bg-avatar-blue',
    'bg-avatar-green',
    'bg-avatar-yellow',
    'bg-avatar-orange',
    'bg-avatar-red'
  ],
  plugins: [],
}


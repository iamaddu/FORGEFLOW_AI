/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forge: {
          dark: '#0A111D',
          navy: '#101B2B',
          card: '#132032',
          cardHover: '#182940',
          border: '#1C2E46',
          borderLight: '#2A4060',
          teal: '#16B8A5',
          tealHover: '#13A291',
          tealGlow: 'rgba(22, 184, 165, 0.15)',
          amber: '#E5A84B',
          amberGlow: 'rgba(229, 168, 75, 0.15)',
          offwhite: '#F3F5F7',
          muted: '#8A99AD',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(22, 184, 165, 0.25)',
        glowAmber: '0 0 25px -5px rgba(229, 168, 75, 0.25)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
}

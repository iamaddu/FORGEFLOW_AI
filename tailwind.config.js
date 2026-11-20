/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          teal: '#1A957E',       // Exact Slide 2 Teal Background
          tealDark: '#147A67',
          tealLight: '#22AC93',
          tealPale: '#E2F4F0',
          purple: '#523D8A',     // Exact Slide 1 Royal Violet
          purpleDark: '#3E2C6B',
          purpleLight: '#654FA0',
          purplePale: '#EFEBF8',
          peach: '#F8C8BE',      // Exact Slide 1 & 2 Soft Peach / Pink Cards
          peachDark: '#ECAEA2',
          peachPale: '#FDF2EF',
          mango: '#F5A636',      // Exact Slide 1 CTA Button "Buy smarter. Build profit."
          mangoHover: '#E59524',
          charcoal: '#1E1638',   // Deep Purple Charcoal for crisp typography
          white: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 24px -4px rgba(26, 40, 35, 0.08), 0 2px 6px -1px rgba(26, 40, 35, 0.04)',
        cardLg: '0 16px 36px -6px rgba(26, 40, 35, 0.12), 0 4px 12px -2px rgba(26, 40, 35, 0.06)',
        button: '0 4px 14px 0 rgba(245, 166, 54, 0.35)',
      }
    },
  },
  plugins: [],
}

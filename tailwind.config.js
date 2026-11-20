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
          purple: '#4E3C80',
          purpleDark: '#392A62',
          purpleDeeper: '#281D46',
          purpleLight: '#5D4996',
          lilac: '#E8E2F6',
          lilacLight: '#F3F0FA',
          lilacBorder: '#D2C6EA',
          peach: '#FAD5C8',
          peachLight: '#FDECE6',
          peachDark: '#EAA994',
          sun: '#F9C349',
          sunLight: '#FEF3D6',
          mint: '#10B981',
          mintLight: '#D1FAE5',
          charcoal: '#1E1736',
          textMuted: '#6B5E87',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -5px rgba(25, 15, 45, 0.15)',
        cardDeep: '0 20px 40px -10px rgba(25, 15, 45, 0.35)',
        glowPurple: '0 0 25px -5px rgba(78, 60, 128, 0.4)',
        glowPeach: '0 0 25px -5px rgba(250, 213, 200, 0.5)',
      }
    },
  },
  plugins: [],
}

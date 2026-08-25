/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#17284F',
        'navy-deep': '#0F1C38',
        gold: '#C69A45',
        'gold-light': '#DDB971',
        bg: '#F7F3EC',
        'bg-light': '#FFFDF9',
        ink: '#1E2430',
        'ink-soft': '#6D7077',
        nature: '#526B52',
        'nature-deep': '#39492F',
        line: '#ECE4D3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

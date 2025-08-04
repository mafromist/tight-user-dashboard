/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  prefix: 'tw-', // Prevents conflicts with PrimeVue
  corePlugins: {
    preflight: false, // Prevents Tailwind from resetting PrimeVue styles
  },
  plugins: [PrimeUI],
}

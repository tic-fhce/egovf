/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/modules/egovf-sra/**/*.{vue,js,ts,jsx,tsx}',
  ],
   safelist: [
    'bg-red-600',
    'hover:bg-red-700',
    'text-white',
    'px-4',
    'py-2',
    'mr-2',
    'rounded-md',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-red-400',
    'bg-gray-200',
    'hover:bg-gray-300',
    'text-gray-800',
    'focus:ring-gray-400',
    'transition',
    'shadow-md',
    'shadow-sm'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


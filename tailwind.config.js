/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors: {
      'marketplace-accent': 'FFFFAF',
      'kids-support-accent': '00B500',
      'digital-library-accent': '089BA5',
      'study-buddy-accent': 'BADDFF',
      'site': '2F73A7',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6'
    },
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      'poppins': ['Poppins', ...defaultTheme.fontFamily.sans],
      'notoJP': ['"Noto Sans JP"', ...defaultTheme.fontFamily.sans],
      'EnglishMarketJA': ['EnglishMarketJA', 'sans-serif'],
      'EnglishMarketEN': ['EnglishMarketEN', 'sans-serif'],
      'EnglishStudyEN': ['EnglishStudyEN', 'sans-serif'],
      'KidsSupportEN': ['KidsSupportEN', 'sans-serif'],
      'KidsSupportJA': ['KidsSupportJA', 'sans-serif'],
      'DigitalLibraryEN': ['DigitalLibraryEN', 'sans-serif'],
      'DigitalLibraryJA': ['DigitalLibraryJA', 'sans-serif'],
      'StudyBuddyEN': ['StudyBuddyEN', 'sans-serif'],
      'StudyBuddyJA': ['"Zen Old Mincho"', 'sans-serif']
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}


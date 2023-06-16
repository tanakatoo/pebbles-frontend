/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      'marketplace-accent': '#FFFFAF',
      'kids-support-accent': '#00B500',
      'digital-library-accent': '#089BA5',
      'study-buddy-accent': '#BADDFF',
      'primary': '#2F73A7',
      'primary-light-1': '#ADD2EB',
      'primary-light-2': '#CEE4F3',
      'primary-very-light': '#DEEDF7',
      'primary-super-light': '#EFF6FB',
      'primary-dark': '#1C5073',
      'white': '#FFFFFF',
      'background': '#F6F6F6',
      'gray-stroke': '#C6C6C6',
      'gray': '#C6C6C6',
      'gray-text': '#61646B',
      'black': '#212427',
      'secondary': '#FF8C42',
      'secondary-light': '#FAE1D1',
      'secondary-dark': '#FF751F',
      'accent': '#A3E470',
      'accent-light': '#DBFDC0',
      'accent-very-light': '#EBFFDB',
      'error': '#DE1010',
      'success': '#276A4A',
      'information': '#2E71D7',
      'link': '#2004CE'
    },
    fontFamily: {
      sans: ['PoppinsRegular', ...defaultTheme.fontFamily.sans],
      'poppins': ['PoppinsRegular', ...defaultTheme.fontFamily.sans],
      'PoppinsMedium': ['PoppinsMedium', ...defaultTheme.fontFamily.sans],
      'PoppinsBold': ['PoppinsBold', ...defaultTheme.fontFamily.sans],
      'NotoSansJPRegular': ['NotoSansJPRegular', ...defaultTheme.fontFamily.sans],
      'NotoSansJPMedium': ['NotoSansJPMedium', ...defaultTheme.fontFamily.sans],
      'NotoSansJPBold': ['NotoSansJPBold', ...defaultTheme.fontFamily.sans],
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
    container: {
      padding: {
        DEFAULT: '16px',
        md: '32px',
        lg: '160px'
      }
    },
    extend: {
      fontSize: {
        'mobile-card-header': ['14px', '24px'],
        'mobile-card-body': ['14px', '24px'],
        'mobile-label-1': ['12px', '16px'],
        'mobile-label-2': ['12px', '16px'],
        'mobile-body-1': ['16px', '24px'],
        'mobile-body-2': ['16px', '24px'],
        'mobile-body-3': ['16px', '24px'],
        'mobile-section-header': ['18px', '32px'],
        'mobile-page-header': ['24px', '32px'],
        'mobile-header-1': ['32px', '48px'],
        'mobile-header-2': ['32px', '48px'],
      },
      boxShadow: {
        'dropdown': '0px 4px 8px rgba(0, 0, 0, 0.25)'
      }

    },
  },
  plugins: [require('@tailwindcss/forms'),
  require('@headlessui/tailwindcss')],
}


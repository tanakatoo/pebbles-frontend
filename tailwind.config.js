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
      'community-accent': '#008222',
      'regional-accent': "#554200",
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
      'gray-background': '#DCD9D9',
      'black': '#212427',
      'secondary': '#FF8C42',
      'secondary-light': '#FAE1D1',
      'secondary-dark': '#FF751F',
      'secondary-background': '#FFEFE4',
      'accent': '#A3E470',
      'accent-light': '#DBFDC0',
      'accent-very-light': '#EBFFDB',
      'error': '#DE1010',
      'error-light': '#FFC7C7',
      'success': '#276A4A',
      'information': '#2E71D7',
      'link': '#2004CE',
      'link-hover': '#624fdc',
      'gold-1': "#ECC440",
      'gold-2': "#FFFA8A",
      'gold-3': "#DDAC17",
      'gold-4': "#FFFF95"

    },
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      'poppins': ['Poppins', ...defaultTheme.fontFamily.sans],
      'NotoSansJP': ['NotoSansJP', ...defaultTheme.fontFamily.sans],
      'EnglishMarketJA': ['EnglishMarketJA', 'sans-serif'],
      'EnglishMarketEN': ['EnglishMarketEN', 'sans-serif'],
      'EnglishStudyEN': ['EnglishStudyEN', 'sans-serif'],
      'KidsSupportEN': ['KidsSupportEN', 'sans-serif'],
      'KidsSupportJA': ['KidsSupportJA', 'sans-serif'],
      'DigitalLibraryEN': ['DigitalLibraryEN', 'sans-serif'],
      'DigitalLibraryJA': ['DigitalLibraryJA', 'sans-serif'],
      'StudyBuddyEN': ['StudyBuddyEN', 'sans-serif'],
      'StudyBuddyJA': ['"Zen Old Mincho"', 'sans-serif'],
      'Community': ['"Kiwi Maru"', 'sans-serif'],
      'Regional': ['"Roboto Slab"', 'sans-serif']
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
        'mobile-label-2': ['14px', '16px'],
        'mobile-body-1': ['16px', '24px'],
        'mobile-body-2': ['16px', '24px'],
        'mobile-body-3': ['16px', '24px'],
        'mobile-section-header': ['18px', '32px'],
        'mobile-page-header': ['24px', '32px'],
        'mobile-header-1': ['32px', '48px'],
        'mobile-header-2': ['32px', '48px']
      },
      boxShadow: {
        'dropdown': '0px 4px 8px rgba(0, 0, 0, 0.25)'
      },
      borderRadius: {
        'ml': '10px'
      },
      backgroundImage: {
        'homeHero': "url('./images/homeHeroFriends-mobile.jpg ')",
        'homeHeroTablet': "url('./images/homeHeroFriends-tablet.jpg ')",
        'homeHeroDesktop': "url('./images/homeHeroFriends-desktop.jpg ')",
        'homeHelp': "url('./images/home-help-mobile.jpg ')",
        'homeHelpTablet': "url('./images/home-help-tablet.jpg ')",
        'homeHelpDesktop': "url('./images/home-help.jpg ')",
        'homeStartMobile': "url('./images/homeStart-700.jpg ')",
        'homeStartTablet': "url('./images/homeStart-1400.jpg ')",
        'homeStartDesktop': "url('./images/homeStart-2400.jpg ')",
        'oopsDesktop': "url('./images/oops-desktop.jpg')",
        'oopsTablet': "url('./images/oops-tablet.jpg')",
        'oopsMobile': "url('./images/oops-mobile.jpg')",
        'usersSquare': "url('./images/users-square.jpg')",
        'markeplaceSquare': "url('./images/marketplace-square.jpg')",
        'communitySquare': "url('./images/community-square.jpg')",
        'regionalSquare': "url('./images/regional-square.jpg')",
        'regionalParisSquare': "url('./images/regionalParis-square.jpg')",
        'learningSquare': "url('./images/town-square.jpg')",
        'learningGlobeSquare': "url('./images/townGlobe-square.jpg')"
      },

      width: {
        '112': '112px',
        '50': '50px',
        '80': '80px',
        'usercard': '358px',
        'messages': '500px'
      },
      height: {
        '50': '50px',
        '112': '112px',
        '80': '80px',
        'usercard': '358px'
      },



    },
  },
  plugins: [require('@tailwindcss/forms'),
  require('@headlessui/tailwindcss')],
}


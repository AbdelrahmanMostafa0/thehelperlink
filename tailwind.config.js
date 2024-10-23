const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    colors: {
      ...colors,
      lightGreen: {
        100: '#E5F8F2',
        200: '#CBF1E5',
        300: '#B0EBD7',
        400: '#96E4CA',
        500: '#7CDDBD',
      },
      darkGreen: {
        100: '#CDD8D7',
        200: '#9AB0AF',
        300: '#688986',
        400: '#35615E',
        500: '#033A36',
      },
      darkBlue: {
        100: '#D2D2D9',
        200: '#A5A5B3',
        300: '#77798E',
        400: '#4A4C68',
        500: '#1D1F42',
      },
      lightBlue: {
        100: '#CDD8ED',
        200: '#9CB1DB',
        300: '#6A8AC9',
        400: '#3963B7',
        500: '#073CA5',
      },
      darkOrange: {
        100: '#FFE9E5',
        200: '#FFD3CB',
        300: '#FFBEB1',
        400: '#FFA897',
        500: '#FF927D',
      },
      customBackground: '#FAFAFA',
      hleperBackground: '#F8FFFD',
      black: '#000',
      white: '#fff',
    },
    fontWeight: {},
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '50%': '50%',
      '100%': '100%',
      16: '4rem',
    },
    screens: {
      '2xs': '390px',
      // => @media (min-width: 360px) { ... }

      xs: '475px',
      // => @media (min-width: 475px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1780px',
      // => @media (min-width: 1536px) { ... }

      sxl: { max: '1280px' },
      // => @media (max-width: 1280px) { ... }

      slg: { max: '1024px' },
      // => @media (max-width: 1280px) { ... }

      smd: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      ssm: { max: '640px' },
      // => @media (max-width: 640px) { ... }

      sxs: { max: '475px' },
      // => @media (max-width: 475px) { ... }
    },
    extend: {
      colors: {},
      boxShadow: {
        'custom-shadow': '0px 4px 19px rgba(0, 0, 0, 0.1)',
        'custom-inset-shadow': 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
        'custom-light-shadow': '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
        'custom-dark-deep-shadow': '0px 15.25px 10.675px rgba(0, 0, 0, 0.25)',
        'custom-deep-shadow':
          '0px 100px 80px rgba(0, 0, 0, 0.03), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0227778), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0182222), 0px 20px 13px rgba(0, 0, 0, 0.015), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0117778), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00722222)',
      },
      zIndex: {
        60: 60,
        70: 70,
      },
      spacing: {
        unset: 'unset',
      },
      backgroundImage: {
        bgGradient:
          'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
        radialGradient:
          'radial-gradient(65.17% 65.17% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 0.01%, rgba(0, 0, 0, 0.24) 100%)',
      },
      fontFamily: {
        AvenirArabic: ['AvenirArabic', 'sans-serif'],
        //"Open Sans", "Helvetica", sans-serif
        // https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese
      },
      fontWeight: {
        light: 200,
        book: 300,
        regular: 400,
        medium: 500,
        heavy: 600,
        black: 700,
      },
      fontSize: {
        h1: ['90px', '103px'],
        h1_small: ['35px', '51px'],
        h2: ['70px', '80px'],
        h2_small: ['35px', '40px'],
        h3: ['48px', '56px'],
        h3_small: ['32px', '32px'],
        h4: ['36px', '42px'],
        h4_small: ['28px', '28px'],
        h5: ['24px', '30px'],
        h5_small: ['22px', '22px'],
        h6: ['20px', '25px'],
        h6_small: ['20px', '25px'],
        body1: ['18px', '22px'],
        body2: ['16px', '20px'],
        body3: ['16px', '26px'],
        caption: ['14px', '18px'],
        '2xl': [
          '1.5625rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
            fontWeight: '500',
          },
        ],
        '5xl': [
          '4.4375rem',
          {
            lineHeight: '4.125rem',
            letterSpacing: '-0.03em',
            fontWeight: '800 !important',
          },
        ],
      },
      borderRadius: {
        30: '30px',
        20: '20px',
        10: '10px',
      },
    },
  },
  variants: {
    float: ['responsive', 'direction'],
    margin: ['responsive', 'direction'],
    padding: ['responsive', 'direction'],
    textAlign: ['responsive', 'direction'],
  },
  plugins: [require('flowbite/plugin'), require('tailwindcss-dir')()],
};

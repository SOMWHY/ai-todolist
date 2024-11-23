/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'malibu': {
        '50': '#f0f9ff',
        '100': '#dff3ff',
        '200': '#b9e7fe',
        '300': '#62cffe',
        '400': '#35c2fb',
        '500': '#0aabed',
        '600': '#0089ca',
        '700': '#006ea4',
        '800': '#055d87',
        '900': '#0a4c70',
        '950': '#07304a',
    },
    'cerise-red': {
        '50': '#fef2f4',
        '100': '#fde6e9',
        '200': '#fbd0d9',
        '300': '#f7aab9',
        '400': '#f27a93',
        '500': '#e63f66',
        '600': '#d42a5b',
        '700': '#b21e4b',
        '800': '#951c45',
        '900': '#801b40',
        '950': '#470a1f',
    },
    
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      cursive:['Indie Flower', 'cursive'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}


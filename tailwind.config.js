/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      width: {
        'custom': '75%', // Define a custom width
      }
    },
  },
  colors: {
    customGreen: '#00A49B',
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}



/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '900px',
        lg: '1150px',
        xl: '1400px',
        xl2: '1550px',
      },
      colors: {
        bg: '#29292C',
        body: '#111219',
        neon1: '#92fe9d',
        neon2: '#00c9ff',

        // neonPurple: '#900d09',
      },
    },
  },
  plugins: [],
};

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
        bg: '#222222',
        neonPurple: '#4666FF',
        skyBlue: '#00BCD4',
        neonPink: '#EE82EE',

        // neonPurple: '#900d09',
      },
    },
  },
  plugins: [],
};

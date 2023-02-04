const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blurple: {
          50: '#5865F2',
          100: '#4651be',
        },
      },
    },
    fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [],
}
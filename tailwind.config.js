const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        blurple: {
          50: '#5865f2',
          100: '#525ccc',
        },
      },
    },
    fontFamily: {
      sans: ['Rubik', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}

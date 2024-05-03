/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          700: '#00875F',
          500: '#00B37E',
        },
        gray: {
          800: '#19191c',
          700: '#121214',
          600: '#202024',
          500: '#29292E',
          400: '#323238',
          300: '#7C7C8A',
          200: '#C4C4CC',
          100: '#E1E1E6'
        },
        white: '#FFFFFF',
        red: {
          500: '#F75A68'
        }
      },
      fontFamily: {
        regular: "Roboto_400Regular",
        bold: "Roboto_700Bold",
      },
      fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
      },
      spacing: {
        14: 56,
        33: 148
      }
    },
  },
  plugins: [],
}


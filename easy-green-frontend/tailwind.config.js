module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add Roboto as the primary font for 'sans'
        roboto: ['Roboto', 'sans-serif'], // Create a specific alias for Roboto if needed
      },
      scale: {
        80: ".80", 
        60: ".60",
      },
    },
  },
  plugins: [],
}
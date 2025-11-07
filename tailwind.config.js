
/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./src/app/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      container:{
        center: true,
        padding:{
          DEFAULT: "3rem"
        },
        screens: {
          xxs:"100px",
          xs: "420px",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1512px"
        }
      },
      colors:{
        primary:"#273389",
        texthearder:"#151D48",
        pgrey:"#737791",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


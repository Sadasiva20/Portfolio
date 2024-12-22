import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");



export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}" ,  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
     
  theme: {    //theme 2 ( Monochromatic) - Midnight blue, steel blue, light blue
    extend: {
      colors:{
        primary: '#002147', //previous color: #002147
        nav:'#193759',
        secondary: '#005F69', //previous color: #4682B4
        accent: '#ADD8E6', 
        contact: '#193759',  //slate gray
        
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        custom1:[
         '"Arvo"',
         '"serif"',
        ],
        custom2:[
         '"Roboto"',
         '"Open Sans"',
        '"Montserrat"',
        '"Oswald"',
        '"sans-serif"',
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;

import type { Config } from "tailwindcss";
import {heroui} from "@heroui/react";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#002147', //previous color: #002147
        nav:'#193759',
        secondary: '#005F69', //previous color: #4682B4
        accent: '#ADD8E6',
        contact: '#193759',  
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
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config;

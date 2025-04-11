import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#0A3732',
        green:'#36BA7E',
        black:'#0D0D12',
        black200:'#292D36',
        gray800:'#8A898B',
        gray600:'#6C6F75',
        bglight:'#FAFAFA',
        borderColor:'#E6E6E6',
        borderColor2:'rgba(218, 218, 218, 0.80)',
        borderColor3:'rgba(255, 255, 255, 0.10)',
        borderColor4:'rgba(208, 213, 220, 0.60)',
        inputBackground:'rgba(255, 255, 255, 0.04)',
        modalBackdrop:'rgba(0,0,0,.5)',
        lineargradient:'linear-gradient(180deg, #E5F8F6 0%, #F1F1E6 100%)',
      },
      screens: {
        mobile: { max: '576px' }, // custom max-width media query
      },
      fontFamily: {
        heading: 'Arial'
      },
      boxShadow: {
        md:'0px 0px 6px 0px rgba(113, 128, 150, 0.16)',
        lg:'0px 2px 15px 0px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
} satisfies Config;

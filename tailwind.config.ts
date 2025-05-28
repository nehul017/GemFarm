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
        primary: '#0A3732',
        green: '#36BA7E',
        green50: '#E8F5E9',
        black: '#0D0D12',
        black200: '#292D36',
        gray800: '#8A898B',
        gray600: '#6C6F75',
        bglight: '#FAFAFA',
        borderColor: '#E6E6E6',
        borderColorlight: '#CDCDCD',
        borderColor2: 'rgba(218, 218, 218, 0.80)',
        borderColor3: 'rgba(255, 255, 255, 0.10)',
        borderColor4: 'rgba(208, 213, 220, 0.60)',
        inputBackground: 'rgba(255, 255, 255, 0.04)',
        modalBackdrop: 'rgba(0,0,0,.5)',
        lineargradient: 'linear-gradient(180deg, #E5F8F6 0%, #F1F1E6 100%)',
      },
      screens: {
        mobile: { max: "380px" },
      },
      fontFamily: {
        heading: 'Arial'
      },
      boxShadow: {
        md: '0px 0px 6px 0px rgba(113, 128, 150, 0.16)',
        lg: '0px 2px 15px 0px rgba(0, 0, 0, 0.08)',
        cardShadow: '0px 2px 10px 0px rgba(113, 128, 150, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    },
  },
  plugins: [],
} satisfies Config;

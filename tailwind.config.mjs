/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Soft UI Backgrounds
        soft: {
          bg: '#EEF2F6',
          surface: '#F0F4F8',
          well: '#E6ECF2',
          border: '#DCE4EC',
        },
        // Sovereign Navy 墨蓝
        navy: {
          900: '#061A2B',
          800: '#0A2540',
          700: '#0E3257',
          600: '#14456F',
          500: '#1B5C8F',
          400: '#2E78B0',
        },
        // Compliance Green 合规绿
        green: {
          700: '#17734E',
          600: '#1E8A5F',
          500: '#27A56F',
          100: '#DCF0E5',
        },
        // Signal Cyan 科技青
        cyan: {
          600: '#0B7FA3',
          500: '#0E9BC4',
          100: '#DBF0F7',
        },
        // Regulatory Amber 监管琥珀
        amber: {
          600: '#A85F12',
          500: '#C9791E',
          100: '#FBEAD2',
        },
        // Slate Text / Accents
        slate: {
          50: '#F7F9FB',
          100: '#EEF2F6',
          200: '#DCE3EA',
          300: '#C2CDD6',
          500: '#6B7A89',
          600: '#52606D',
          700: '#3C4A57',
          800: '#212D38',
          900: '#14212B',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        // Neomorphic Soft UI shadows
        'neo-card': '12px 12px 28px #D1D9E6, -12px -12px 28px #FFFFFF',
        'neo-card-sm': '6px 6px 16px #D1D9E6, -6px -6px 16px #FFFFFF',
        'neo-btn': '4px 4px 10px #D1D9E6, -4px -4px 10px #FFFFFF',
        'neo-btn-hover': '2px 2px 6px #D1D9E6, -2px -2px 6px #FFFFFF',
        'neo-inset': 'inset 4px 4px 8px #D1D9E6, inset -4px -4px 8px #FFFFFF',
        'neo-inset-sm': 'inset 2px 2px 5px #D1D9E6, inset -2px -2px 5px #FFFFFF',
        'neo-nav': '0 10px 30px -5px rgba(209, 217, 230, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
      },
      borderRadius: {
        'neo': '20px',
        'neo-lg': '28px',
      }
    },
  },
  plugins: [],
};

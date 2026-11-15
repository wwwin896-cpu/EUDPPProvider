/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
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
        // Brass 点睛金
        gold: {
          500: '#B08D3E',
        },
        // Slate / Neutral 冷灰阶
        slate: {
          50: '#F7F9FB',
          100: '#EEF2F6',
          200: '#DCE3EA',
          300: '#C2CDD6',
          500: '#6B7A89',
          600: '#52606D',
          700: '#3C4A57',
          900: '#14212B',
        },
        // Semantic
        danger: {
          600: '#B42318',
        },
        info: {
          600: '#1B5C8F',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};

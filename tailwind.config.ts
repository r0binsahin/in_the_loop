import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        left: {
          '0%, 100%': { right: '15%' },
          '70%': { right: '40%' },
        },
        down: {
          '0%, 100%': { top: '15%' },
          '70%': { top: '40%', right: '20%' },
        },
        up: {
          '0%, 100%': { bottom: '60%', right: '10%' },
          '70%': { bottom: '10%', right: '15%' },
        },
      },
      animation: {
        down: 'down 200s infinite ease-in-out',
        left: 'left 200s infinite ease-in-out',
        up: 'up 200s infinite ease-in-out',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#494949',
          secondary: '#f5e9dd',
          accent: '#e85d58',
        },
      },
    ],
  },
};

export default config;

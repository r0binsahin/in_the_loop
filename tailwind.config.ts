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
        down: {
          '0%, 100%': { top: '10%' },
          '70%': { top: '80%' },
        },
        /*     right: {
          '0%, 100%': { right: '10%' },
          '50%': { right: '80%' },
        }, */
        left: {
          '0%, 100%': { left: '10%' },
          '30%': { left: '80%' },
        },
        up: {
          '0%, 100%': { bottom: '10%' },
          '70%': { bottom: '80%' },
        },
        circles: {
          '0%': { backgroundPosition: '30% 70%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '20% 50%' },
        },
      },
      animation: {
        down: 'down 200s infinite ease-in-out',
        left: 'left 200s infinite ease-in-out',
        up: 'up 200s infinite ease-in-out',
        circles: 'gradient 200s infinite ease-in-out',
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

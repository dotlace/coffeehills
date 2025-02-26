import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#d6d6c3', // Primary color
        accent: {
          brown: '#5C4033',
          darkGreen: '#2F4F4F',
          beige: '#E3D5C1',
          olive: '#A3A380',
          deepCoffee: '#3E2723',
          softGreen: '#abb6a0',
          stone: '#565549',
        },
      },
    },
  },
  plugins: [],
};

export default config;

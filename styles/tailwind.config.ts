import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#a855f7', // custom purple if needed
      },
    },
  },
  plugins: [],
}
export default config;

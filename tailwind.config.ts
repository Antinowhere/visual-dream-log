import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'dream-blue': {
          900: '#0a1628',
          800: '#0f1e35',
          700: '#142642',
          600: '#1a2f4f',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

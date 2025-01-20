import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      dropShadow: {
        emerald: "0 5px 10px rgb(52 211 153 / 0.4)",
      },
    },
  },
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        deep: "#1e2430",
      },
      backgroundImage: {
        "hero-pattern": "url('/pattern.png')",
        "mask-group": "url('/Mask_Group.png')"
      },

    },
  },
  plugins: [],
};
export default config;

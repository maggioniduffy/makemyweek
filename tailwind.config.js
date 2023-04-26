/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(tw-gradient-stops))",
      },
      colors: {
        lightpink: "#ffdde2ff",
        pink: "#bd2d87ff",
        darkpurple: "#242038ff",
        yellow: "#e6af2eff",
        darkpurple2: "#26081cff",
      },
    },
  },
  plugins: [],
};

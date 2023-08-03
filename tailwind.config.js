/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#160623",
        background: "#f3e9fb",
        primary: "#5b2786", // or #6C47FF or #5b2786
        secondary: "#e0c6f6",
        accent: "#8123cd",
        secondaryAccent: "#BB447A",
        primary: {
          50: "#faf6fe",
          100: "#f3eafd",
          200: "#e9d8fc",
          300: "#d7baf8",
          400: "#bf8ef2",
          500: "#a662ea",
          600: "#9042db",
          700: "#7b30c0",
          800: "#682c9d",
          900: "#5b2786",
          950: "#390f5c",
        },
      },
    },
  },
  plugins: [],
};

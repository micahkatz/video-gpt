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
        // primary: {
        //   50: "#f4f2ff",
        //   100: "#eae8ff",
        //   200: "#d7d4ff",
        //   300: "#bab1ff",
        //   400: "#9785ff",
        //   500: "#6c47ff",
        //   600: "#6430f7",
        //   700: "#561ee3",
        //   800: "#4818bf",
        //   900: "#3c169c",
        //   950: "#230b6a",
        // },
      },
    },
  },
  plugins: [],
};

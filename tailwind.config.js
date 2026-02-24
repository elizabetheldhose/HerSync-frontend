/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      blush: "#FDF8FB",
      softRose: "#D88BA6",
      roseDark: "#C76A8C",
      lavenderSoft: "#B8A4E3",
      lavenderDark: "#8E7CC3",
      warmText: "#3C2F36",
      mutedText: "#7A6B72",
    },
    borderRadius: {
      "3xl": "1.5rem",
    }
  },
},
  plugins: [],
};

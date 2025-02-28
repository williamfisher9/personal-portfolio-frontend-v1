/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "100ch",
            color: "white",
          },
        },
      })
    },
  },
  plugins: [tailwindScrollbar, require("@tailwindcss/typography")],
}


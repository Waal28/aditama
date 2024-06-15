/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#EAE153",
        tertiary: "#505050",
        header_footer: "#F0F0F0",
      },
    },
  },
  plugins: [daisyui],
};

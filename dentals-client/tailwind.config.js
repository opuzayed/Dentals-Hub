/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        dentaltheme: {
          primary: "#3ABFF8",

          secondary: "#36D399",

          accent: "#3A4256",

          neutral: "#570DF8",

          "base-100": "#FFFFFF",
        },
      },
     
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

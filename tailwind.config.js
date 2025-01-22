/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"]
      },
      backgroundImage: {
        auth: "url('./assets/auth-background.png')"
      }
    }
  },
  plugins: [require("daisyui")]
};

module.exports = tailwindConfig;

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indianred: "#DB5461",
        paledogwood: "#FFD9CE",
        rebeccapurple: "#593C8F",
        iceblue: "#8EF9F3",
        spacecadet: "#171738",
        lightgreyishblue: "#778899",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(text|bg|border)/,
    },
  ],
};

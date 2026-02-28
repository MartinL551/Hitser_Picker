/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],
  darkMode: "class",
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        deckgrey: 'rgb(var(--color-deckgrey) / <alpha-value>)',
        deckwood: 'rgb(var(--color-deckwood) / <alpha-value>)',
        onairred: 'rgb(var(--color-onairred) / <alpha-value>)',
        label: 'rgb(var(--color-label) / <alpha-value>)',
        deckgold: 'rgb(var(--color-deckgold) / <alpha-value>)',
        deckblack: 'rgb(var(--color-deckblack) / <alpha-value>)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    backgroundOpacity: true,
  },
};


/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}"
	],
	theme: {
		colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      red: colors.red,
      lime: colors.lime,
      emerald: colors.emerald,
      gray: colors.gray,
    },
		extend: {},
	},
	plugins: [],
}


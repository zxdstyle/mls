module.exports = {
	important: true,
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				navy: {
					DEFAULT: '#282b3d',
					100: '#32364a',
					200: '#3e4257',
				},
				primary: '#00be68',
				cerulean: '#004878',
			},
		},
	},
	plugins: [],
}

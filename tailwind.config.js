/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./**/*.{html,js,css,hbs}'],
	theme: {
		colors: {
			'light-cream': 'var(--color-light-cream)',
			'dark-cream': 'var(--color-dark-cream)',
			'dark-green': 'var(--color-dark-green)',
			'light-blue': 'var(--color-light-blue)'
		},
		fontFamily: {
			body: 'var(--font-body-family)',
			heading: 'var(--font-heading-family)'
		},
		letterSpacing: {
			1: '-0.025em',
			2: '-0.02rem',
			3: '-0.0175rem',
			4: '-0.01625rem',
			5: '-0.015rem',
			6: '-0.0125rem'
		},
		extend: {
			screens: {
				'3xl': '1920px',
				'4xl': '2560px'
			}
		}
	},
	plugins: []
};

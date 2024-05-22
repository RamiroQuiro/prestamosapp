/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					100: '#5B2CE4',
					200: '#B290B8',
					300:'#6C84AA',
					'bg-claro': '#E9E9F1',
					'bg-componentes': '#FFFFFF',
					'resaltado': '#FFFACD',
					'texto': '#2E273F',
					'error': "#FF7F50",
					'bacSidebar':'#1B2728'
				}
			},
			fontFamily: {
				'IndieFlower': ['IndieFlower','serif']
			},
		},
	},
	plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					100: '#5B2CE4',
					200: '#5F48A3',
					300:'#8E884A',
					400:'#4C4563',
					'bg-claro': '#E9E9F1',
					'bg-componentes': '#FFFFFF',
					'resaltado': '#E3D32B',
					'texto': '#2E273F',
					'error': "#BF0404",
					'background':'#E9E9F1'
				}
			},
			fontFamily: {
				'IndieFlower': ['IndieFlower','serif']
			},
		},
	},
	plugins: [],
}

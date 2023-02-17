export default defineNuxtConfig({
	modules: [
		'@nuxt/devtools',
		'@unocss/nuxt',
		'@sidebase/nuxt-auth',
		'nuxt-vitest',
	],
	unocss: {
		webFonts: {
			fonts: {
				inter: 'Inter',
			},
			provider: 'google',
		},
	},
	build: {
		transpile: ['trpc-nuxt'],
	},
	sourcemap: {
		server: true,
		client: false,
	},
	css: ['@unocss/reset/antfu.css'],
})

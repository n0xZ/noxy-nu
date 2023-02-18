export default defineNuxtConfig({
	modules: [
		'@nuxt/devtools',
		'@unocss/nuxt',
		'@sidebase/nuxt-auth',
		'nuxt-vitest',
		'nuxt-icon',
		'@vueuse/nuxt',
		'@vite-pwa/nuxt',
		'@nuxt/image-edge',
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

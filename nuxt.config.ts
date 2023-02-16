export default defineNuxtConfig({
	modules: ['@nuxt/devtools', '@unocss/nuxt', '@sidebase/nuxt-auth'],
	build: {
		transpile: ['trpc-nuxt'],
	},
	sourcemap: {
		server: true,
		client: false,
	},
	css: ['@unocss/reset/antfu.css'],
})

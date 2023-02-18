import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '~/server/api/trpc/[trpc]'

export default defineNuxtPlugin((nuxtApp) => {
	const client = createTRPCNuxtClient<AppRouter>({
		links: [
			httpBatchLink({
				url: '/api/trpc',
			}),
		],
	})
	nuxtApp.vueApp.use(autoAnimatePlugin)
	return {
		provide: {
			client,
		},
	}
})

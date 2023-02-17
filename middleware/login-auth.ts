export default defineNuxtRouteMiddleware(() => {
	const { status } = useSession()
	if (status.value === 'authenticated')
		return navigateTo('/home', { redirectCode: 302 })
})

<script setup lang="ts">
	const { signIn } = useSession()
	useHead({ title: 'Inicia sesión en Noxy-nu!' })
	definePageMeta({ middleware: ['login-auth'] })

	const signInViaGithub = async () => await signIn('github')
</script>

<template>
	<section
		class="h-screen grid place-items-center container mx-auto max-w-4xl p-3"
	>
		<button
			class="px-3 py-3 w-full rounded-lg flex flex-row items-center justify-center space-x-5 bg-sky-500 c-white"
			@click="signInViaGithub()"
		>
			<Icon :name="'carbon-logo-github'" class="h-6 w-6" />
			<span>Iniciar sesión desde github</span>
		</button>
	</section>
</template>

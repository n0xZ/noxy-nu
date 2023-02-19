<script setup lang="ts">
	type Props = {
		sendMessage: ({
			authorId,
			chatId,
			content,
		}: {
			authorId: string
			chatId: string
			content: string
		}) => void
	}
	const props = defineProps<Props>()
	const userId = useUserId()
	const route = useRoute()
	const chatId = String(route.query.id)
	const messageContent = ref('')
	const isLoading = ref(false)

	const onSubmit = async () => {
		isLoading.value = true
		await props.sendMessage({
			authorId: userId.value!,
			chatId,
			content: messageContent.value,
		})
		isLoading.value = false
		messageContent.value = ''
	}
</script>

<template>
	<form
		@submit.prevent="onSubmit"
		class="w-full flex-col justify-end items-end space-x-3 mb-3"
	>
		<input
			type="text"
			class="px-3 py-3 rounded-lg bg-sky-50 outline-none w-full max-w-6xl"
			placeholder="Ingrese su mensaje a enviar"
			:disabled="isLoading"
			v-model="messageContent"
		/>
		<button
			type="submit"
			:disabled="isLoading"
			class="px-3 py-3 rounded-lg bg-sky-300 xl:w-42 w-full"
		>
			{{ !isLoading ? 'Enviar' : 'Enviando...' }}
		</button>
	</form>
</template>

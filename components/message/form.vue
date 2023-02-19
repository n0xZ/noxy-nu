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
	const chatId = String(route.params.id)
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
	<div class="w-full p-3 border-t-2 border-neutral-100">
		<input
			type="text"
			class="px-3 py-4 rounded-md bg-sky-200 outline-none w-full"
			placeholder="Ingrese su mensaje a enviar"
			:disabled="isLoading"
			v-model="messageContent"
			@keyup.enter="onSubmit"
		/>
	</div>
</template>

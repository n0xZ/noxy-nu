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
	const defaultInputClass = 'px-3 py-4 rounded-md  outline-none w-full'
</script>

<template>
	<div
		class="w-full flex flex-row justify-end items-center p-3 border-t-2 border-neutral-100"
	>
		<input
			type="text"
			:class="`${defaultInputClass} ${isLoading ? 'bg-sky-100' : 'bg-sky-50'} `"
			placeholder="Ingrese su mensaje a enviar"
			:disabled="isLoading"
			v-model="messageContent"
			@keyup.enter="onSubmit"
		/>
		<Icon
			name="line-md:loading-loop"
			class="xl:w-7 xl:h-7 w-6 h-6 absolute mr-4 mb-1 cursor-not-allowed"
			v-if="isLoading"
		/>
	</div>
</template>

<script setup lang="ts">
	type MessageStatus = 'LOADING' | 'ERROR' | 'SENDED' | 'STALE'
	const route = useRoute()

	const { $client } = useNuxtApp()
	const chatId = String(route.params.id)
	const { data: messages, pending } = useGetMessageByChatId(chatId)
	const messageStatus = ref<MessageStatus>('STALE')
	const sendMessage = async ({
		authorId,
		chatId,
		content,
	}: {
		authorId: string
		chatId: string
		content: string
	}) => {
		const newMessage = await $client.createMessage.mutate({
			authorId,
			chatId,
			content,
		})
		messageStatus.value = 'LOADING'
		if (!newMessage) throw createError('An error ocurred while sending message.')
		messages.value?.unshift(newMessage)
		messageStatus.value = 'SENDED'
	}
</script>

<template>
	<aside class="p-5 border-b-2 border-neutral-50 block w-full">
		<ul
			class="flex flex-row items-center justify-between container mx-auto block"
		>
			<li>
				<h3 class="font-bold xl:text-2xl">{{ route.query.title }}</h3>
			</li>
			<li><MenuEditDropdown /></li>
		</ul>
	</aside>
	<div class="flex flex-col justify-between">
		<MessageListSkeleton v-if="pending" />
		<div
			class="grid place-items-center h-screen"
			v-else-if="!pending && messages?.length === 0"
		>
			<p>No hay mensajes en este chat</p>
		</div>
		<MessageList v-if="messages && !pending" :messages="messages" />
		<MessageForm :send-message="sendMessage" />
	</div>
</template>

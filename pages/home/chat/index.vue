<script setup lang="ts">
	const route = useRoute()

	const { $client } = useNuxtApp()
	const chatId = String(route.query.id).trim()
	const { data: messages, pending, refresh } = useGetMessageByChatId(chatId)
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
		if (newMessage) messages.value?.unshift(newMessage)
	}
	onBeforeRouteUpdate((to, from) => {
		if (to.query.id !== from.query.id) refresh()
	})
</script>

<template>
	<aside class="p-5 border-b-2 border-neutral-50 block w-full">
		<ul class="flex flex-row items-center justify-between container mx-auto">
			<li>
				<h3 class="font-bold xl:text-2xl">{{ route.query.title }}</h3>
			</li>
			<li><MenuEditDropdown /></li>
		</ul>
	</aside>
	<div class="flex flex-col justify-between ml-4">
		<MessageListSkeleton v-if="pending" />
		<div
			class="grid place-items-center h-screen"
			v-else-if="!pending && messages?.length === 0"
		>
			<p>No hay mensajes en este chat</p>
		</div>
		<MessageList
			v-if="messages && !pending && messages.length !== 0"
			:messages="messages"
		/>
		<MessageForm :send-message="sendMessage" />
	</div>
</template>

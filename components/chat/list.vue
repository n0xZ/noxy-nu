<script setup lang="ts">
	import { Chat } from '@prisma/client'

	type Props = {
		chats: Chat[]
	}
	const props = defineProps<Props>()
</script>

<template>
	<article class="w-full flex flex-col justify-center mt-4 ">
		<ChatItem v-for="chat in props.chats" :chat="chat" />
	</article>
</template>

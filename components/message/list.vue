<script setup lang="ts">
	import { Message } from '@prisma/client'

	type Props = {
		messages: Message[]
	}
	defineProps<Props>()
</script>

<template>
	<ul
		class="max-h-screen h-screen w-full overflow-y-scroll flex flex-col-reverse p-2 gap-5 mb-10 "
	>
		<MessageItem
			v-for="message in messages"
			:key="message.id"
			:message="message"
		/>
	</ul>
</template>

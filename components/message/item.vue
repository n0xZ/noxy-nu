<script setup lang="ts">
	import { Message } from '@prisma/client'

	type Props = {
		message: Message
	}
	const props = defineProps<Props>()
	const userId = useUserId()
	const isActualAuthor = userId.value === props.message.authorId
	const actualDate = new Date(props.message.createdAt)
	const actualHour = actualDate.getHours() + ':' + actualDate.getMinutes()
</script>

<template>
	<li
		:class="`p-4 flex flex-col justify-center space-y-3 rounded-lg min-w-36 max-w-xl ${
			isActualAuthor ? 'self-end bg-sky-300' : 'self-start'
		}`"
	>
		<p>{{ props.message.content }}</p>
		<p class="place-self-end c-neutral-500">{{ actualHour }}</p>
	</li>
</template>

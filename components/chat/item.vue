<script setup lang="ts">
	import { Chat } from '@prisma/client'

	type Props = {
		chat: Chat
	}
	defineProps<Props>()
	const defaultItemClass =
		'p-5  flex flex-row   items-center space-x-3   h-full  w-full    '
	const route = useRoute()
</script>

<template>
	<NuxtLink
		:key="chat.id"
		:to="`/home/chat/${chat.id}`"
		:class="`${defaultItemClass} ${
			route.params.id && route.params.id === chat.id
				? 'bg-sky-200 c-neutral-700'
				: 'hover:bg-sky-50 duration-100 ease-in-out'
		}`"
	>
		<Icon name="carbon:email" class="h-8 w-8" />
		<h2 class="truncate font-semibold">{{ chat.name }}</h2>
	</NuxtLink>
</template>

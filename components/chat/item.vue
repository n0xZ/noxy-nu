<script setup lang="ts">
	import { Chat } from '@prisma/client'

	type Props = {
		chat: Chat
	}
	defineProps<Props>()
	const defaultItemClass =
		'p-5  flex flex-row   items-center space-x-3   h-full  w-full   rounded-lg '
	const route = useRoute()
</script>

<template>
	<NuxtLink
		:key="chat.id"
		:to="`/home/chat/${chat.id}?title=${chat.name}`"
		:class="`${defaultItemClass} ${
			route.params.id && route.params.id === chat.id
				? 'bg-sky-200 c-neutral-700'
				: 'hover:bg-sky-50 duration-100 ease-in-out'
		}`"
	>
		<Icon name="carbon:email" class="xl:h-8 xl:w-8 h-4 w-4" />
		<h2 class="truncate font-semibold xl:text-normal text-sm">{{ chat.name }}</h2>
	</NuxtLink>
</template>
